#!/usr/bin/env python3
"""Kokoro-82M text-to-speech for the daily podcast's clips (docs/daily-podcast.md).

Run by scripts/podcast-segments.mjs, never by hand: it starts this once, loads
the model once, and sends one JSON request per line on stdin --

    {"text": "Bayes Theorem.\\nBayes' Theorem is ...", "out": "/tmp/x.wav", "voice": "af_heart", "speed": 1.0}

-- answering each with one JSON line on stdout: {"ok": true, "out": ..., "seconds": 71.4}
or {"ok": false, "error": "..."}. Each line of the script is spoken on its own,
with a pause between, so a paragraph ends the way a reader would end it.

Kokoro is Apache-2.0 (model and voices), run through kokoro-onnx (MIT) on the
CPU; the model files are downloaded by the workflow
(.github/workflows/podcast-segments.yml) and passed in with --model / --voices.
"""

import argparse
import json
import re
import sys

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

LINE_PAUSE = 0.45   # seconds between the script's lines (blocks)
SENTENCE_PAUSE = 0.12
MAX_CHARS = 380     # keep each call well inside the model's phoneme window


def chunks(line: str):
    """A line cut at sentence ends (then commas) into pieces short enough to speak in one call."""
    if len(line) <= MAX_CHARS:
        return [line]
    out, cur = [], ''
    for sentence in re.split(r'(?<=[.!?;:])\s+', line):
        if len(sentence) > MAX_CHARS:
            parts = re.split(r'(?<=,)\s+', sentence)
        else:
            parts = [sentence]
        for p in parts:
            if cur and len(cur) + 1 + len(p) > MAX_CHARS:
                out.append(cur)
                cur = p
            else:
                cur = f'{cur} {p}'.strip()
    if cur:
        out.append(cur)
    return out


def speak(kokoro: Kokoro, text: str, voice: str, speed: float):
    rate = 24000
    pieces = []
    for line in [l.strip() for l in text.split('\n') if l.strip()]:
        for i, chunk in enumerate(chunks(line)):
            samples, rate = kokoro.create(chunk, voice=voice, speed=speed, lang='en-us')
            if i > 0:
                pieces.append(np.zeros(int(rate * SENTENCE_PAUSE), dtype=np.float32))
            pieces.append(samples.astype(np.float32))
        pieces.append(np.zeros(int(rate * LINE_PAUSE), dtype=np.float32))
    audio = np.concatenate(pieces) if pieces else np.zeros(1, dtype=np.float32)
    return audio, rate


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', required=True)
    ap.add_argument('--voices', required=True)
    args = ap.parse_args()
    kokoro = Kokoro(args.model, args.voices)
    print(json.dumps({'ready': True}), flush=True)
    for raw in sys.stdin:
        raw = raw.strip()
        if not raw:
            continue
        try:
            req = json.loads(raw)
            audio, rate = speak(kokoro, req['text'], req.get('voice', 'af_heart'), float(req.get('speed', 1.0)))
            sf.write(req['out'], audio, rate)
            print(json.dumps({'ok': True, 'out': req['out'], 'seconds': len(audio) / rate}), flush=True)
        except Exception as err:  # one bad clip mustn't stop the batch
            print(json.dumps({'ok': False, 'error': str(err)}), flush=True)


if __name__ == '__main__':
    main()

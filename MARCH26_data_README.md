# FME-24 Dataset (March 2026 Update)

This repository contains the **FME-24 dataset**, an audio-annotated dataset with extracted features for **98 participants**. The dataset includes timestamped emotional annotations and a rich set of acoustic, spectral, harmonic, and rhythm-based features extracted from short audio segments.

## Dataset Structure

### Current CSVs

All current CSVs are stored in the root folder or `current_csvs/`:

- `librosa_features_full_fme_dataset_MARCH_2026_NUMERIC_CHORDS.csv`  
  - 98 participants  
  - ~1784 timestamped annotations  
  - 78+ extracted features (detailed below)  

### Archived CSVs

Older CSVs (93 participants, composite features) are stored in `old_csvs/` for reference **only**.  
**⚠️ Warning:** Do not use these for analysis.

---

## CSV Columns Overview

| Column | Description |
|--------|-------------|
| `participant` | Unique participant ID |
| `file_path` | Audio file name (MP3) |
| `timestamp` | Timestamp (in seconds) for segment extraction |
| `emotion_sentence` | Annotator’s sentence describing emotion |
| `familiarity` | Familiarity rating of the stimulus |
| `valence` | Emotional valence rating |
| `arousal` | Emotional arousal rating |
| `timestamp.1` | Duplicate timestamp (from original annotations) |
| `annotation_order` | Order of the annotation for the file |
| `total_annotations` | Total number of annotations for this file |
| `timestamp_imputed` | Timestamp corrected/imputed for analysis |
| `start_time`, `end_time` | Segment start and end (seconds) |

---

## Acoustic Features

### Librosa-Based Features

| Feature | Description |
|---------|-------------|
| `rms` | Root-mean-square energy of segment |
| `zcr` | Zero-crossing rate (signal noisiness) |
| `harmonic_ratio` | Ratio of harmonic to total energy |
| `percussive_ratio` | Ratio of percussive to total energy |

### Tonnetz Features

| Feature | Description |
|---------|-------------|
| `tonnetz_mean_1..6` | Mean values of 6-dimensional tonal centroid (Tonnetz) features |
| `tonnetz_var_1..6` | Variance of each Tonnetz dimension |

### MFCC Features

| Feature | Description |
|---------|-------------|
| `mfcc_mean_1..13` | Mean of Mel-frequency cepstral coefficients (MFCC 1–13) |
| `mfcc_var_1..13` | Variance of MFCC 1–13 |

---

## Harmonic & Pitch Features

| Feature | Description |
|---------|-------------|
| `pitch_mean`, `pitch_std`, `pitch_range` | Mean, standard deviation, and range of fundamental pitch |
| `num_notes` | Number of unique notes detected in segment |
| `harmonic_percussive_ratio` | Ratio of harmonic to total signal energy |
| `chord_root` | Numeric encoding of detected chord root (C=0 … B=11) |
| `chord_type` | Numeric encoding of chord quality (major=0, minor=1, diminished=2, augmented=3) |
| `key` | Numeric key of the segment (C=0 … B=11) |
| `scale` | Scale type: major=1, minor=0 |
| `key_strength` | Confidence of key detection |

---

## Rhythm / Onset Features

| Feature | Description |
|---------|-------------|
| `bpm` | Estimated beats per minute |
| `num_beats` | Number of beats in segment |
| `danceability` | Segment’s danceability estimate |
| `onset_rate` | Rate of note onsets detected per second |

---

## Feature Extraction Notes

- Audio segments are **2 seconds** long, centered on the imputed timestamp.  
- **Essentia** is used for spectral, tonal, and pitch analysis.  
- **Librosa** is used for RMS, ZCR, harmonic/percussive separation, MFCC, and Tonnetz features.  
- Chord features are encoded numerically using a **root + type mapping** for machine learning compatibility.  
- Rhythm and onset features are computed using Essentia’s RhythmExtractor2013 and OnsetRate algorithms.  

---

## How to Use

```python
import pandas as pd

df = pd.read_csv("librosa_features_full_fme_dataset_MARCH_2026_NUMERIC_CHORDS.csv")

# Example: Inspect MFCC mean features
mfcc_features = df[[f"mfcc_mean_{i}" for i in range(1,14)]]
print(mfcc_features.head())
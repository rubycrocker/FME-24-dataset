# FME-24 Dataset: Film Music & Emotion (2024)

**FME-24** is a curated dataset of contemporary film music excerpts annotated with perceived emotion over time. The dataset was created to support research in Music Information Retrieval (MIR), music psychology, AI-driven emotion analysis, and generative composition.

The dataset now includes 1784 rows, 91 columns with 78 features, covering 98 participants, 422 excerpts, and 275 unique songs.

## Dataset Contents

The repository contains several CSV files, organized by update and purpose:

Main CSVs (March 2026 – V-A regression)
These CSVs are the most up-to-date and suitable for continuous emotion analysis, regression, and feature-based research:

 - `librosa_features_full_fme_dataset_MARCH_2026_NC.csv`
This CSV contains 1784 rows and 91 columns, including 78 acoustic, spectral, harmonic, and rhythm features extracted from 422 audio excerpts across 98 participants and 275 unique songs. It includes valence-arousal (V-A) annotations, timestamps, familiarity ratings, and emotion sentences, and is designed for regression or machine learning analyses predicting continuous emotion values.

 - `fme-demographics-music-sophistication.csv`
Contains participant demographics and GoldMSI music sophistication responses. This CSV maps participant ID to survey responses, with 100 participants recorded, though 2 were removed from the March 2026 main CSV due to missing V-A annotations or timestamps.

 - `per-song-fme.csv`
Raw data in per-song format. Each row corresponds to a song excerpt with missing data included. Useful for understanding how the dataset was originally extracted from the online experiment, but not necessary for primary analyses.

 - `film-emotion-music-datasheet.csv`
   Music and Film metadata on the music files; including timestamps of the excerpts in the full audio track, ISRC numbers, size, length, sample rate, composer, genre, director and year.

   

Other 2026 March CSVs are included here which support the CSVs above.
`librosa_features_full_fme_dataset_MARCH_2026.csv` has non-numerical data for some features (example: key and scale).


Older CSVs (September 2025 – Emotion Category / Before & After)
These CSVs focus on categorical emotion analysis rather than continuous V-A prediction. They include feature sets before and after emotional-change timestamps:

- `fme-24-features-emotions-after.csv`  
  Contains emotion annotations and extracted audio features **at/after each emotional-change timestamp**, reflecting the participant's emotional state **after** marking a change.

- `fme-24-features-emotions-before.csv`  
  Contains the same structure but reflects the emotional state **before** the timestamp. For a participant’s first annotation of a track, `before` defaults to `(0,0)` in valence-arousal space.

> Both CSV files are aligned in row order and can be merged for time-series analyses of emotional change (`ΔV` / `ΔA`).
> The 'after' csv contains the AV associated with time-stamps, the 'before' csv was created if a before/after comparison is needed.

Older versions
Additional CSVs provide earlier versions of annotations, features, and metadata. These include participant-matched annotations, raw survey responses, chord extractions, and sample metadata. These are preserved for reference but are not recommended for primary analysis.

---

## Main CSV Detailed Description

Each row represents a single participant’s annotation of a 2-second music segment. Columns include:

Participant ID, file path, timestamp, emotion sentence, familiarity, valence-arousal ratings, timestamped annotations.

Extracted audio features: MFCC means & variances, Tonnetz descriptors, spectral centroids, zero-crossing rate, RMS, harmonic & percussive energy ratios, pitch statistics, chord root/type, key & scale, rhythm metrics (BPM, onset density), and derived timbre measures.

Emotion categories (names and IDs) derived from semantic analysis of participants’ free-text sentences.

This structure allows detailed analysis of perceptual and acoustic correlates of emotion in music, including time-series exploration, regression, clustering, or machine learning.

>
> ## How to Use

> **Load the CSV** in Python
> **Feature selection:** Use the 78 numeric features for modeling, regression, clustering, or music analysis.
> Subset/aggregate data using track metadata (film title, composer, year) or participant information.
>**Participant Information** Use the 'participant-ID' to filter out participants with different musical experiences or demographics to compare responses.


> ## Licensing & Audio Access
> Full audio files are not included due to copyright.
> Audio references are provided via ISRC codes; you can retrieve audio from platforms like Spotify or YouTube.
> All CSVs and metadata are open-access for research purposes.

> ## Notes
> Timestamps are relative to audio segments, not full film scenes.
> Emotion categories are derived from free-text annotations and mapped to standard emotion labels (based on research of emotion models).
> Participants: 98 annotators with varying musical expertise; demographic metadata is included in csv: **fme-demographics-music-sophisication.csv**
> Original dataset information of the audiofiles in csv: **film-emotion-music-datasheet.csv**
> Explore annotations on page: **https://rubycrocker.github.io/FME-24-dataset/interactive-fme-dataset.html**
> Participants did not have accompanying visuals when annotating audio files.
> There are other downloadable CSVs with the data in different formats.

Reference: 
R. Crocker and G. Fazekas, “Temporal analysis of emotion
perception in film music: insights from the FME-24 dataset,”
in Sound and Music Computing Conference Proceedings,
vol. 21, 2024, pp. 247–252.


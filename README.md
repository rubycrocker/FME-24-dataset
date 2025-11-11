# FME-24 Dataset: Film Music & Emotion (2024)

**FME-24** is a curated dataset of contemporary film music excerpts annotated with perceived emotion over time. The dataset was created to support research in Music Information Retrieval (MIR), music psychology, AI-driven emotion analysis, and generative composition.


## Dataset Contents

The repository contains the following CSV files:

- `fme-24-features-emotions-after.csv`  
  Contains emotion annotations and extracted audio features **at/after each emotional-change timestamp**, reflecting the participant's emotional state **after** marking a change.

- `fme-24-features-emotions-before.csv`  
  Contains the same structure but reflects the emotional state **before** the timestamp. For a participant’s first annotation of a track, `before` defaults to `(0,0)` in valence-arousal space.

> Both CSV files are aligned in row order and can be merged for time-series analyses of emotional change (`ΔV` / `ΔA`).
> The 'after' csv contains the AV associated with time-stamps, the 'before' csv was created if a before/after comparison is needed.

---

## CSV File Structure

Each CSV contains the following columns:

| Column | Description |
|--------|-------------|
| **Pathname** | File path or reference to the audio segment (audio itself is not included due to copyright). |
| **TS Timestamp** | Timestamp (in seconds) of the annotation event. |
| **V-A** | Valence and Arousal values. For example, `V = 0.75`, `A = 0.32`. |
| **Emotion Sentence** | Free-text “emotion sentence” provided by the participant describing the emotion. |
| **Familiarity Rating** | Familiarity rating (Likert scale) indicating how familiar the participant is with the music. |
| **Participant ID** | Participant ID. |
| **Metadata** | Metadata about the track, including film title, release year, and composer. |
| **Timestamp Number** | Annotation order for the participant for that track. |
| **Features** | 179 extracted audio features (frequency, timbre, key, texture, etc.) in numeric format. |
| **Emotion Category Match** | Derived emotion category from the participant’s free-text sentence. |
| **Row ID** | Row ID (unique for dataset management). |
| **Emotion Category Name** | Emotion category name (e.g., `happy`, `sad`). |
| **Emotion Category ID** | Numerical ID for the emotion category. |

> **Note:** Features were extracted in 2-second windows around each timestamp to capture the musical context of emotional change. There are 179 Features extracted.
>
> ## How to Use

> **Load the CSV** in Python
> **Merge** before and after if you want to calculate emotional change vectors
> **Feature selection:** Use the 179 audio features for machine learning, regression, or clustering tasks
> **Using metadata:** Track film title, composer, year, or participant ID to subset or aggregate data for your analysis.


> ## Licensing & Audio Access
> Full audio files are not included due to copyright.
> Audio references are provided via ISRC codes; you can retrieve audio from platforms like Spotify or YouTube.
> All CSVs and metadata are open-access for research purposes.

> ## Notes
> Timestamps are relative to audio segments, not full film scenes.
> Emotion categories are derived from free-text annotations and mapped to standard emotion labels (based on research of emotion models).
> Participants: 93 annotators with varying musical expertise; demographic metadata is included in csv: **FME-Survey-Details.csv**
> Original dataset information of the audiofiles in csv: **film-emotion-music-dataset-metadata.csv**
> Explore annotations on page: **https://rubycrocker.github.io/FME-24-dataset/interactive-fme-dataset.html**
> Participants did not have accompanying visuals when annotating audio files.
> There are other downloadable CSVs with the data in different formats.

Reference: 
R. Crocker and G. Fazekas, “Temporal analysis of emotion
perception in film music: insights from the FME-24 dataset,”
in Sound and Music Computing Conference Proceedings,
vol. 21, 2024, pp. 247–252.


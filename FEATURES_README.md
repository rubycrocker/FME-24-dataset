# FME-24 Dataset: Film Music & Emotion (2024)
+-------------------------+
|    	 fme-24-features-emotions-after.csv	  |
+-------------------------+

data points with meta data and features
+---------------------------------------------------------------------------+

╔═══════════════════════════════════════════════════════════════════════════════════════════╗
║                                           Columns                                         ║
╠═══════════════════╦═══════════════════════════════════════════════════════════════════════╣
║  file_path        ║  ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║   timestamp       ║                               ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ arousal           ║       ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║  valence          ║                                 ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║emotion_sentence   ║         ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║familiarity_rating ║                                   ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ participant_id    ║        ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║  film             ║                               ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║composer           ║        ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║song_name          ║          ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║   year            ║                               ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ soundtrack        ║       ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║  director         ║                                 ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ genre             ║         ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ISRC               ║                                   ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ num_timestamps    ║        ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timestamp_order    ║                               ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣

FEATURES:
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║diag_strength      ║ diag_strength = np.mean([np.mean(np.diag(ssm, k)) for k in range(1, 5)])  # average of near diagonals of self-similarity matrix; measures repetition in segment ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║compression_ratio  ║ compression_ratio = len(unique_frames) / len(mfccs)  # ratio of unique MFCC frames to total frames; higher = less redundancy ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_motion        ║ mfcc_motion = np.mean(np.std(mfcc_delta, axis=0))  # average variability of MFCC deltas; captures timbre change over time ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_accel         ║ mfcc_accel = np.mean(np.std(mfcc_delta2, axis=0))  # average variability of MFCC second-order deltas; measures acceleration of timbral changes ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tuning_deviation_cents ║ tuning_deviation_cents = 1200 * np.log2(tuning_freq / 440.0)  # deviation from standard A440 tuning in cents; positive = sharp, negative = flat ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║intonation_var     ║ intonation_var = np.var(voiced_pitches)  # variance of voiced pitch values; higher = more pitch fluctuation ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║repetition_contrast ║ repetition_contrast = diag_strength / (mfcc_motion + 1e-9)  # ratio of repetition to timbre motion; high = repeated patterns with low timbral change ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_stability    ║ timbre_stability = 1.0 / (mfcc_motion + 1e-9)  # inverse of MFCC motion; high = stable timbre ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║intonation_stability ║ intonation_stability = 1.0 / (np.std(voiced_pitches) + 1e-9)  # inverse of pitch standard deviation; high = stable pitch ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║duration_s         ║ duration_s = segment_s  # duration of audio segment in seconds ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_frames         ║ num_frames = S.shape[1]  # number of frames in segment (from STFT) ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║hpr_ratio          ║ hpr_ratio = harmonic_energy / (percussive_energy + 1e-12)  # ratio of harmonic to percussive energy ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║harmonic_energy    ║ harmonic_energy = np.sum(y_harmonic ** 2)  # total energy in harmonic component of audio ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║percussive_energy  ║ percussive_energy = np.sum(y_percussive ** 2)  # total energy in percussive component ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_centroid_mean ║ spectral_centroid_mean = np.mean(librosa.feature.spectral_centroid(S=S, sr=sr))  # mean "brightness" of spectrum ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_contrast_mean ║ spectral_contrast_mean = np.mean(librosa.feature.spectral_contrast(S=S, sr=sr))  # mean contrast between peaks and valleys in spectrum ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_contrast_var  ║ spectral_contrast_var = np.var(librosa.feature.spectral_contrast(S=S, sr=sr))  # variance of spectral contrast across frames ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rolloff_85_mean    ║ rolloff_85_mean = np.mean(librosa.feature.spectral_rolloff(S=S, sr=sr, roll_percent=0.85))  # 85th percentile of spectrum energy ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rolloff_95_mean    ║ rolloff_95_mean = np.mean(librosa.feature.spectral_rolloff(S=S, sr=sr, roll_percent=0.95))  # 95th percentile of spectrum energy ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_flatness_mean ║ spectral_flatness_mean = np.mean(librosa.feature.spectral_flatness(S=S))  # tonal noisiness; 0 = pure tone, 1 = noise ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_flatness_var  ║ spectral_flatness_var = np.var(librosa.feature.spectral_flatness(S=S))  # variance of flatness across frames ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║spectral_flux_mean     ║ spectral_flux_mean = np.mean(np.sqrt(np.sum((S_norm[:,1:] - S_norm[:,:-1])**2, axis=0)))  # mean spectral flux; measures how fast spectrum changes ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║roughness_mean        ║ roughness_mean = np.nanmean(roughness_vals)  # mean perceptual roughness of segment ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║roughness_var         ║ roughness_var = np.nanvar(roughness_vals)  # variance of roughness across frames ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║inharmonicity         ║ inharmonicity = np.nanmean(inharm_vals)  # mean inharmonicity across frames; deviation from harmonic frequencies ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_delta_var_mean    ║ mfcc_delta_var_mean = np.mean(np.var(mfcc_delta, axis=1))  # mean variance across MFCC delta coefficients; captures timbral variability ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_expressivity    ║ timbre_expressivity = mean(zscores([brightness, noisiness, mfcc_delta_var, spectral_flux]))  # combined z-scored measure of timbral expressivity ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_frames_used        ║ num_frames_used = num_frames  # frames actually used in feature computation ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_mean_1..13        ║ mfcc_mean_i = np.mean(mfcc[i, :])  # mean of MFCC coefficient i ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_delta_mean_1..13  ║ mfcc_delta_mean_i = np.mean(delta_mfcc[i, :])  # mean delta of MFCC i ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mfcc_deltadelta_mean_1..13 ║ mfcc_deltadelta_mean_i = np.mean(deltadelta_mfcc[i, :])  # mean delta-delta of MFCC i ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║bpm                   ║ bpm = tempo from librosa.beat_track  # estimated beats per minute ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tempo_std             ║ tempo_std = np.std(tempo_frames)  # variation in beat intervals ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_beats             ║ num_beats = len(beat_times)  # number of detected beats ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_downbeats         ║ num_downbeats = count of downbeat frames  # requires downbeat detection algorithm ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_offbeats          ║ num_offbeats = num_beats - num_downbeats  # number of non-downbeat beats ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║swing_ratio           ║ swing_ratio = measure of relative timing between beats  # placeholder for formula ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rhythmic_entropy      ║ rhythmic_entropy = entropy of inter-onset intervals  # measures rhythmic complexity ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_mean              ║ ioi_mean = np.mean(inter_onset_intervals)  # average time between onsets ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_std               ║ ioi_std = np.std(inter_onset_intervals)  # standard deviation of onset intervals ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_max               ║ ioi_max = np.max(inter_onset_intervals)  # maximum interval between onsets ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_min               ║ ioi_min = np.min(inter_onset_intervals)  # minimum interval between onsets ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_entropy           ║ ioi_entropy = entropy of inter-onset intervals  # measures variability of timing ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║micro_dynamics         ║ micro_dynamics = measure of small amplitude changes / expressive micro-variations  # placeholder; typically RMS variation within segment ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║down_off_contrast      ║ down_off_contrast = contrast between downbeat and offbeat amplitudes  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║down_off_ratio         ║ down_off_ratio = mean amplitude downbeats / mean amplitude offbeats  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║beat_rms_var           ║ beat_rms_var = variance of RMS energy on detected beats  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║crest_factor           ║ crest_factor = peak amplitude / RMS amplitude  # measures signal “spikiness” ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║onset_peak_ratio       ║ onset_peak_ratio = peak amplitude at onsets / mean amplitude  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rms_skew               ║ rms_skew = skewness of RMS amplitude distribution  # measures asymmetry of loudness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rms_kurt               ║ rms_kurt = kurtosis of RMS amplitude distribution  # measures peakiness of loudness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_mean             ║ pitch_mean = np.mean(voiced_pitches)  # average fundamental frequency (Hz) ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_std              ║ pitch_std = np.std(voiced_pitches)  # standard deviation of pitch (Hz) ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_range            ║ pitch_range = pitch_max - pitch_min  # overall melodic range in Hz ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║signed_intervals_mean  ║ signed_intervals_mean = np.mean(np.diff(voiced_pitches))  # average pitch interval (can be negative) ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║abs_intervals_mean     ║ abs_intervals_mean = np.mean(np.abs(np.diff(voiced_pitches)))  # average absolute pitch interval ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║step_leap_ratio        ║ step_leap_ratio = number of small intervals / number of large intervals  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║perc_ascending         ║ perc_ascending = proportion of ascending intervals  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║perc_descending        ║ perc_descending = proportion of descending intervals  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║unvoiced_ratio         ║ unvoiced_ratio = fraction of frames with no detected pitch  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║vibrato_extent         ║ vibrato_extent = mean amplitude of pitch modulation  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║vibrato_rate           ║ vibrato_rate = mean frequency of vibrato oscillations (Hz)  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_chords_detected    ║ num_chords_detected = count of detected chords in segment  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║main_chord             ║ main_chord = most frequent chord in segment  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║chords_list            ║ chords_list = list of detected chords  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║harmonic_rhythm        ║ harmonic_rhythm = rate of chord changes  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║chord_diatonicity      ║ chord_diatonicity = proportion of diatonic chords in key  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║cadence_V_to_I         ║ cadence_V_to_I = count or probability of V→I cadences  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║cadence_iv_to_V        ║ cadence_iv_to_V = count or probability of iv→V cadences  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║circle_fifths_movement ║ circle_fifths_movement = measure of chord movement along circle of fifths  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonal_entropy          ║ tonal_entropy = entropy of pitch-class distribution  # measures tonal uncertainty ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonnetz_mean           ║ tonnetz_mean = mean of Tonnetz coordinates  # harmonic/tonal representation ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonnetz_var            ║ tonnetz_var = variance of Tonnetz coordinates  # harmonic variability ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonnetz_speed          ║ tonnetz_speed = mean frame-to-frame change in Tonnetz coordinates  # harmonic movement speed ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_brightness      ║ timbre_brightness = spectral_centroid_mean  # proxy for brightness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_noisiness       ║ timbre_noisiness = spectral_flatness_mean  # proxy for noisiness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_sharpness       ║ timbre_sharpness = spectral_flux_mean  # proxy for rapid spectral changes ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║timbre_variability     ║ timbre_variability = mfcc_delta_var_mean  # proxy for timbral variance ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rms_db_variance        ║ rms_db_variance = np.var(librosa.amplitude_to_db(rms_vals))  # variance of loudness in dB ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║loudness_smoothness    ║ loudness_smoothness = 1 / np.mean(np.abs(np.diff(loudness_vals)))  # inverse of loudness fluctuations ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║dynamic_expressivity   ║ dynamic_expressivity = measure of variation in RMS/loudness  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║onset_density          ║ onset_density = number of detected onsets / segment duration ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║ioi_variability        ║ ioi_variability = np.std(inter_onset_intervals)  # similar to ioi_std ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║legato_staccato_index  ║ legato_staccato_index = measure of note duration relative to inter-onset interval  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_variance         ║ pitch_variance = np.var(voiced_pitches)  # pitch stability ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║melodic_range          ║ melodic_range = pitch_max - pitch_min  # melodic span ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║interval_variance      ║ interval_variance = np.var(np.diff(voiced_pitches))  # variance of melodic intervals ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║num_onsets             ║ num_onsets = len(onset_frames)  # total detected onsets ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║beat_regularity        ║ beat_regularity = measure of consistency of inter-beat intervals  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║danceability_x         ║ danceability_x = onset_density / tempo  # proxy; normalized by BPM ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║key                    ║ key = detected tonal key of segment  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║scale                  ║ scale = major/minor classification  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║key_strength           ║ key_strength = correlation with key profile  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonal_stability        ║ tonal_stability = measure of key stability over segment  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_yin              ║ pitch_yin = pitch estimate from Yin algorithm  # fundamental frequency estimate ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_salience         ║ pitch_salience = prominence of detected pitch  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║pitch_height           ║ pitch_height = mean pitch in Hz  # proxy for melody register ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║centroid               ║ centroid = spectral centroid (Hz)  # frequency “center of mass” ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rolloff                ║ rolloff = spectral rolloff (Hz)  # energy percentile of spectrum ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║flatness_db             ║ flatness_db = spectral flatness in dB  # tonal noisiness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║brightness             ║ brightness = spectral centroid  # proxy for brightness ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tempo_bpm              ║ tempo_bpm = estimated BPM from beat detection ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║leaps_on_strong_beats  ║ leaps_on_strong_beats = number of large intervals on strong beats  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║vibrato_beat_align     ║ vibrato_beat_align = degree of vibrato synchronized with beat  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonal_rhythm_complexity ║ tonal_rhythm_complexity = measure of tonal + rhythmic interaction complexity  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║expressive_variability  ║ expressive_variability = variation in dynamics, timbre, pitch  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║groove_index            ║ groove_index = measure of rhythmic “feel”  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║rhythmic_entropy_adj    ║ rhythmic_entropy_adj = adjusted rhythmic entropy  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonnetz_velocity_per_chord ║ tonnetz_velocity_per_chord = mean change in tonnetz per chord  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║tonnetz_stability_index   ║ tonnetz_stability_index = inverse of tonnetz variance  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║onset_count               ║ onset_count = number of detected onsets ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║beats_count_±1s           ║ beats_count_±1s = number of detected beats within ±1 second window ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║danceability_y            ║ danceability_y = alternate proxy for danceability (based on beats + onsets)  # placeholder ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mean_dissonance           ║ mean_dissonance = np.mean(dissonance_vals)  # mean dissonance per segment ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║mean_inharmonicity        ║ mean_inharmonicity = np.mean(inharm_vals)  # mean inharmonicity per segment ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║var_inharmonicity         ║ var_inharmonicity = np.var(inharm_vals)  # variance of inharmonicity ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣

Emotion sentence:

╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║emotion_segment          ║ emotion_segment = the audio/text segment being analyzed  # e.g., 2s excerpt or lyric line ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║matched_emotions         ║ matched_emotions = aggregated emotion labels assigned to this segment  # e.g., “happy, sad” ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║has_emotion_word         ║ has_emotion_word = boolean indicating if segment contains explicit emotion words  # True/False ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║matched_emotions_list    ║ matched_emotions_list = list of all matched emotion labels  # e.g., [“joy”, “fear”] ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║row_id                   ║ row_id = unique identifier for this segment/row in dataset  # useful for merges/tracking ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║final_category_name      ║ final_category_name = mapped high-level emotion category  # e.g., “Positive”, “Negative” ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣
║final_category_number    ║ final_category_number = numeric code for final_category_name  # e.g., 0=Negative, 1=Positive ║
╠═══════════════════╬═══════════════════════════════════════════════════════════════════════╣



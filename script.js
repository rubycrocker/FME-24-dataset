//////////////////////////////////////////////////////////////////////////
// Page navigation & toggle info (unchanged)
//////////////////////////////////////////////////////////////////////////
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function toggleMoreInfo(infoId, button) {
    const info = document.getElementById(infoId);
    const isVisible = info.style.display === 'block';
    info.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'More Details' : 'Hide Details';
}

//////////////////////////////////////////////////////////////////////////
// SURVEY TABLE TOOLTIP (FME-Survey-Details.csv)
//////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const surveyTable = document.getElementById("survey-table");
    const surveyTooltip = document.getElementById("column-tooltip");

    if (surveyTable && surveyTooltip) {
        const tooltipText = {
            0: "This column shows participants' anonymous randomly generated ID.",
            1: "This column shows the date/time the survey was completed.",
            2: "Information for audio file 1 (name, sentence, familiarity, AV ratings, etc.)",
            3: "Participant's Age Range.",
            4: "Countries where participants spent most of their formative years.",
            5: "Gender.",
            6: "Nationality.",
            7: "Current occupation.",
            8: "Information for audio files 2–10.",
            9: "Time spent listening attentively to music each day.",
            10: "Time spent listening casually each day.",
            11: "Years of daily musical instrument practice.",
            12: "Ability to judge if someone is a good singer.",
            13: "Ability to spot mistakes in performances.",
            14: "Ability to compare versions of the same piece.",
            15: "Sense of timing in music.",
            16: "Sense of pitch in music.",
            17: "Self-identification as a musician.",
            18: "Familiarity with DAWs and music production.",
            19: "Importance of music in daily life.",
            20: "Engagement in music-related activities.",
            21: "Addiction-like connection to music.",
            22: "Tracking new music discoveries.",
            23: "Searching/reading about music online.",
            24: "Favourite music genre.",
            25: "Emotional response to music.",
            26: "Music evoking memories.",
            27: "Music evoking chills/shivers.",
            28: "Using music for motivation.",
            29: "Ability to describe emotions evoked by music."
        };

        for (let i = 0; i < 30; i++) {
            const columnCells = surveyTable.querySelectorAll(`.col-${i}`);

            columnCells.forEach(cell => {
                cell.addEventListener("mouseenter", e => {
                    columnCells.forEach(c => c.classList.add("highlight-col"));
                    surveyTooltip.textContent = tooltipText[i] || "";
                    surveyTooltip.style.display = "block";
                    surveyTooltip.style.left = e.pageX + "px";
                    surveyTooltip.style.top = e.pageY + 15 + "px";
                });

                cell.addEventListener("mousemove", e => {
                    surveyTooltip.style.left = e.pageX + "px";
                    surveyTooltip.style.top = e.pageY + 15 + "px";
                });

                cell.addEventListener("mouseleave", () => {
                    columnCells.forEach(c => c.classList.remove("highlight-col"));
                    surveyTooltip.style.display = "none";
                });
            });
        }
    }
});

//////////////////////////////////////////////////////////////////////////
// FME ANNOTATION TABLE TOOLTIP (FME-24 CSV EXPLAINED)
//////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const fmeTooltips = {
        0: 'Full file path of the audio excerpt.',
        1: 'Timestamp marking where emotion changed by participant.',
        2: 'Arousal, Valence values at the timestamp.',
        3: 'Sentence describing perceived emotion.',
        4: 'Participant familiarity rating.',
        5: 'Participant identifier number.',
        6: 'Metadata related to the film/music context; film title, song title, genre, composer, director, ISRC.',
        7: 'Sequential timestamp: the nth timestamp a participant recorded for a given audio excerpt (e.g., the 4th timestamp)',
        8: 'Extracted musical features (179 total), spectral, rhythm, texture, energy, pitch, perceptual features',
        9: 'Sub-sentence–level emotion category matches and splits.',
        10: 'Row ID (unique index for data entry).',
        11: 'Emotion Category Name (e.g., “Happy/Joy”).',
        12: 'Emotion Category ID (integer label, Happy/Joy = 2).'
    };

    const fmeTable = document.getElementById('fme-anno-table');
    const fmeTooltip = document.getElementById('fme-tooltip');

    if (fmeTable && fmeTooltip) {
        for (let i = 0; i <= 12; i++) {
            const columnCells = fmeTable.querySelectorAll(`.col-${i}`);

            columnCells.forEach(cell => {
                cell.addEventListener('mouseenter', e => {
                    // highlight entire column
                    columnCells.forEach(c => c.classList.add('highlight-col'));
                    // show tooltip
                    fmeTooltip.textContent = fmeTooltips[i] || '';
                    fmeTooltip.style.display = 'block';
                    fmeTooltip.style.left = e.pageX + 'px';
                    fmeTooltip.style.top = e.pageY + 15 + 'px';
                });

                cell.addEventListener('mousemove', e => {
                    fmeTooltip.style.left = e.pageX + 'px';
                    fmeTooltip.style.top = e.pageY + 15 + 'px';
                });

                cell.addEventListener('mouseleave', () => {
                    columnCells.forEach(c => c.classList.remove('highlight-col'));
                    fmeTooltip.style.display = 'none';
                });
            });
        }
    }
});


//////////////////////////////////////////////////////////////////////////
// js for 'about.html' page = play around valence/arousal page ////////

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const padding = 40; // Padding around the canvas (space for axis labels)
const graphWidth = canvas.width - 2 * padding;
const graphHeight = canvas.height - 2 * padding;

let clicks = [];
const maxClicks = 20;
let showAnnotations = true;
let showAdjectives = false; // New toggle for adjectives

const resultsDiv = document.getElementById("results");
const resetButton = document.getElementById("resetButton");
const annotationToggle = document.getElementById("annotationToggle");
const adjectiveToggle = document.getElementById("adjectiveToggle");

function drawGrid() {
    const step = graphWidth / 10; // spacing for grid lines (adjusted for -1.0 to 1.0 range)
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    // Draw grid lines for X and Y axes
    for (let x = padding; x <= canvas.width - padding; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
    }

    for (let y = padding; y <= canvas.height - padding; y += step) {
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw center axis (x=0, y=0)
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 2;

    // X axis (adjusted to center of graph)
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height / 2);
    ctx.lineTo(canvas.width - padding, canvas.height / 2);
    ctx.stroke();

    // Y axis (adjusted to center of graph)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, padding);
    ctx.lineTo(canvas.width / 2, canvas.height - padding);
    ctx.stroke();
}

function drawAnnotations() {
    ctx.save();
    ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Positivity label (X axis)
    ctx.fillText("←←← Positivity →→→", canvas.width / 2, canvas.height - padding + 20);

    // Energy label (Y axis, vertical)
    ctx.translate(padding - 30, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("←←← Energy →→→", 0, 10);
    ctx.restore();

    // Draw numeric labels
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const gridCount = 5;
    const step = graphWidth / gridCount;

    // X-axis numbers
    for (let i = 0; i <= gridCount; i++) {
        const x = padding + i * step;
        const label = (i / (gridCount / 2) - 1).toFixed(1);
        ctx.fillText(label, x, canvas.height / 2 + 5);
    }

    // Y-axis numbers
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= gridCount; i++) {
        const y = padding + i * step;
        const label = (1 - i / (gridCount / 2)).toFixed(1);
        ctx.fillText(label, canvas.width / 2 - 8, y);
    }

    ctx.restore();
}

function drawAdjectives() {
    // Draw words at specific coordinates only if the toggle is on
    if (!showAdjectives) return;

    ctx.save();
    ctx.fillStyle = "rgba(50, 50, 50, 0.7)"; // Darker grey for adjectives
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw 'tense' at (x=-0.9, y=0.8)
    const xTense = padding + (0.4 * graphWidth / 2); // x=-0.9
    const yTense = padding + (1 - 0.6) * graphHeight / 2; // y=0.8
    ctx.fillText("Tense", xTense, yTense);

    // Draw 'relaxed' at (x=0.8, y=-0.9)
    const xRelaxed = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yRelaxed = padding + (1 - -0.4) * graphHeight / 2; // y=-0.9
    ctx.fillText("Relaxed", xRelaxed, yRelaxed);

    // Draw 'excited' at (x=0.8, y=-0.9)
    const xExcited = padding + (1 - -0.3) * graphWidth / 2; // x=0.8
    const yExcited = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Excited", xExcited, yExcited);

    // Draw 'depressed' at (x=0.8, y=-0.9)
    const xDepressed = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yDepressed = padding + (1 - -0.45) * graphHeight / 2; // y=-0.9
    ctx.fillText("Depressed", xDepressed, yDepressed);

    // Draw 'tired' at (x=0.8, y=-0.9)
    const xTired = padding + (1 - 0.1) * graphWidth / 2; // x=0.8
    const yTired = padding + (1 - -0.9) * graphHeight / 2; // y=-0.9
    ctx.fillText("Tired", xTired, yTired);

    // Draw 'sleepy' at (x=0.8, y=-0.9)
    const xSleepy = padding + (1 - -0.1) * graphWidth / 2; // x=0.8
    const ySleepy = padding + (1 - -0.9) * graphHeight / 2; // y=-0.9
    ctx.fillText("Sleepy", xSleepy, ySleepy);

    // Draw 'content' at (x=0.8, y=-0.9)
    const xContent = padding + (1 - -0.75) * graphWidth / 2; // x=0.8
    const yContent = padding + (1 - -0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Content", xContent, yContent);

    // Draw 'joyous' at (x=0.8, y=-0.9)
    const xJoyeous = padding + (1 - -0.75) * graphWidth / 2; // x=0.8
    const yJoyeous = padding + (1 - 0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Joyeous", xJoyeous, yJoyeous);

    // Draw 'delighted' at (x=0.8, y=-0.9)
    const xDelighted = padding + (1 - -0.65) * graphWidth / 2; // x=0.8
    const yDelighted = padding + (1 - 0.6) * graphHeight / 2; // y=-0.9
    ctx.fillText("Delighted", xDelighted, yDelighted);

    // Draw 'nervous' at (x=0.8, y=-0.9)
    const xNervous = padding + (1 - 0.7) * graphWidth / 2; // x=0.8
    const yNervous = padding + (1 - 0.3) * graphHeight / 2; // y=-0.9
    ctx.fillText("Nervous", xNervous, yNervous);

    // Draw 'afraid' at (x=0.8, y=-0.9)
    const xAfraid = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yAfraid = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Afraid", xAfraid, yAfraid);

    // Draw 'exhilarated' at (x=0.8, y=-0.9)
    const xExhilarated = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yExhilarated = padding + (1 - 0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Exhilarated", xExhilarated, yExhilarated);

    // Draw 'Angry' at (x=0.8, y=-0.9)
    const xAngry = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yAngry = padding + (1 - 0.85) * graphHeight / 2; // y=-0.9
    ctx.fillText("Angry", xAngry, yAngry);

    // Draw 'Agitated' at (x=0.8, y=-0.9)
    const xAgitated = padding + (1 - 0.1) * graphWidth / 2; // x=0.8
    const yAgitated = padding + (1 - 0.85) * graphHeight / 2; // y=-0.9
    ctx.fillText("Agitated", xAgitated, yAgitated);

    // Draw 'Calm' at (x=0.8, y=-0.9)
    const xCalm = padding + (1 - -0.45) * graphWidth / 2; // x=0.8
    const yCalm = padding + (1 - -0.75) * graphHeight / 2; // y=-0.9
    ctx.fillText("Calm", xCalm, yCalm);

    // Draw 'Bliss' at (x=0.8, y=-0.9)
    const xBliss = padding + (1 - -0.5) * graphWidth / 2; // x=0.8
    const yBliss = padding + (1 - -0.5) * graphHeight / 2; // y=-0.9
    ctx.fillText("Bliss", xBliss, yBliss);

    // Draw 'Disgust' at (x=0.8, y=-0.9)
    const xDisgust = padding + (1 - 0.85) * graphWidth / 2; // x=0.8
    const yDisgust = padding + (1 - -0.1) * graphHeight / 2; // y=-0.9
    ctx.fillText("Disgust", xDisgust, yDisgust);

    // Draw 'Distressed' at (x=0.8, y=-0.9)
    const xDistressed = padding + (1 - 0.8) * graphWidth / 2; // x=0.8
    const yDistressed = padding + (1 - 0.45) * graphHeight / 2; // y=-0.9
    ctx.fillText("Distressed", xDistressed, yDistressed);

    // Draw 'Bored' at (x=0.8, y=-0.9)
    const xBored = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yBored = padding + (1 - -0.6) * graphHeight / 2; // y=-0.9
    ctx.fillText("Bored", xBored, yBored);

    // Draw 'Enthusiastic' at (x=0.8, y=-0.9)
    const xEnthusiastic = padding + (1 - -0.8) * graphWidth / 2; // x=0.8
    const yEnthusiastic = padding + (1 - 0.4) * graphHeight / 2; // y=-0.9
    ctx.fillText("Enthusiastic", xEnthusiastic, yEnthusiastic);

    // Draw 'Gloomy' at (x=0.8, y=-0.9)
    const xGloomy = padding + (1 - 0.75) * graphWidth / 2; // x=0.8
    const yGloomy = padding + (1 - -0.75) * graphHeight / 2; // y=-0.9
    ctx.fillText("Gloomy", xGloomy, yGloomy);

    // Draw 'Drousy' at (x=0.8, y=-0.9)
    const xDrousy = padding + (1 - 0.4) * graphWidth / 2; // x=0.8
    const yDrousy = padding + (1 - -0.8) * graphHeight / 2; // y=-0.9
    ctx.fillText("Drousy", xDrousy, yDrousy);

    ctx.restore();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    if (showAnnotations) {
        drawAnnotations();
    }

    if (showAdjectives) {
        drawAdjectives(); // Draw adjectives if the toggle is on
    }

    // Draw points on the graph (constrained within bounds)
    for (const point of clicks) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
    }
}

canvas.addEventListener("click", (e) => {
    if (clicks.length >= maxClicks) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - padding;
    const y = e.clientY - rect.top - padding;

    // Clip the coordinates to be within -1 to 1 range
    const normX = Math.max(-1, Math.min(1, (x / graphWidth) * 2 - 1));
    const normY = Math.max(-1, Math.min(1, (1 - y / graphHeight) * 2 - 1));

    const color = getRandomColor();
    clicks.push({
        x: padding + (normX + 1) * (graphWidth / 2), // Convert back to canvas coordinates
        y: padding + (1 - normY) * (graphHeight / 2),
        color
    });

    const icon = `<span style="display:inline-block;width:12px;height:12px;background:${color};border-radius:50%;margin-right:8px;"></span>`;
    const line = `<div>${icon}x: ${normX.toFixed(2)}, y: ${normY.toFixed(2)}</div>`;
    resultsDiv.innerHTML += line;

    drawGraph();
});

resetButton.addEventListener("click", () => {
    clicks = [];
    resultsDiv.innerHTML = "";
    drawGraph();
});

annotationToggle.addEventListener("click", () => {
    showAnnotations = !showAnnotations;
    drawGraph();
});

// New adjective toggle functionality
adjectiveToggle.addEventListener("click", () => {
    showAdjectives = !showAdjectives;
    drawGraph();
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial draw
drawGraph();



//////////////////////////////////////////////////////////////////////////
// js for 'about.html' page = play around valence/arousal page ////////




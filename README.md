# TriAD: Multi-Modal Alzheimer’s Risk Stratification

TriAD is a clinical-grade frontend interface designed to screen for Alzheimer's Disease (AD) by triangulating digital biomarkers with proprietary genetic and structural datasets.

> **System Status**: *Data Ingestion & Validation Mode*
>
> This platform serves as the deployment vehicle for our custom-trained risk models. It is architected to capture real-time user telemetry (voice acoustics, oculomotor latency) and correlate it with our ground-truth clinical cohorts.

## The Data Engine

Unlike generic screening tools, TriAD is built to interface directly with our validated clinical datasets:

1.  **Genetic Knowledge Base (`advp.hg38.tsv`)**:
    * **Role**: Explainable AI (XAI) Dictionary.
    * **Function**: Maps 130+ detected SNPs to clinically validated risk ratios (Odds Ratios), allowing the system to explain *why* a genetic flag was raised (e.g., *"Detected rs429358 on APOE gene"*).

2.  **Patient Genetic Data (`preprocessed_alz_data.npz`)**:
    * **Role**: Training ground for Agent 2.
    * **Scale**: 5,076 patients with 130 preprocessed genetic features.
    * **Model**: Random Forest classifier calibrated to detect "Silent Risk" before symptoms appear.

3.  **Imaging Data (`train.parquet`)**:
    * **Role**: Validation set for Agent 3.
    * **Content**: MRI scans labeled by severity (Non-Demented vs. Mild Demented).
    * **Model**: ResNet/CNN architecture for structural segmentation and atrophy detection.

## The Agent Architecture

The system utilizes a multi-agent "Sensor & Inference" architecture:

### Agent 1: The Cognitive Sensor (Input)
*Status: Active Telemetry Implementation*
Because cognitive decline is dynamic, Agent 1 acts as a **Real-Time Sensor** to collect fresh digital biomarkers that standard datasets lack.
* **Acoustic Feature Extraction**: Uses the Web Speech API to capture natural language samples, analyzing hesitation rate and vocabulary richness (Temporal Lobe indicators).
* **Inhibition Latency**: Uses high-precision `performance.now()` timers in the interactive Stroop instrument to measure processing speed (Frontal Lobe indicators).

### Agent 2: The Geneticist (Prediction)
*Status: Model Integration Phase*
* **Input**: User-reported status or VCF file ingestion.
* **Logic**: Runs inference against the `preprocessed_alz_data.npz` model.
* **Explainability**: Cross-references positive hits against `advp.hg38.tsv` to provide medical context rather than black-box scores.

### Agent 3: The Specialist (Validation)
*Status: Imaging Pipeline*
* **Input**: DICOM/Image upload pipeline.
* **Logic**: Pre-processing interface for ResNet/CNN inference models trained on `train.parquet`.

## Roadmap: From Collection to Inference

* **Phase 1 (Current)**: Deploy "Sensor" frontend (Agent 1) to capture standardized inputs (Voice/Reaction Time).
* **Phase 2 (Training)**: Train the Genetic Model (Random Forest) and Imaging Model (FastAI/PyTorch) using the provided datasets.
* **Phase 3 (Integration)**: Connect the frontend `risk.ts` scoring logic to a Python backend serving the trained models.

## Tech Stack

* **Frontend**: React + TypeScript, Vite, Tailwind CSS
* **Sensors**: Web Speech API, High-Resolution Time API
* **Visualization**: Recharts, Framer Motion
* **Planned Backend**: Python (FastAPI), Scikit-learn (Genetic), PyTorch (Imaging)

## Disclaimer

This software is a research instrument designed for use with specific clinical datasets. It is not a standalone diagnostic device. Always consult qualified healthcare professionals for medical advice, diagnosis, and treatment decisions.
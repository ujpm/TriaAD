# TriAD: Multi-Agent Alzheimer’s Screening Platform

TriAD is a progressive, multi-agent interface designed to screen for early signs of Alzheimer's Disease (AD) by triangulating data from three distinct modalities: **Cognitive**, **Genetic**, and **Structural**.

> **Current Status**: *Data Collection & Model Integration Phase*
>
> This repository houses the **Client-Side Sensor Suite**. It is designed to capture novel biomarkers (voice acoustics, reaction time latency, and oculomotor inhibition) to feed into our backend risk models.

## Clinical Backend & Datasets

Unlike standard demos, TriAD is architected to be trained on ground-truth clinical data. The risk scoring algorithms are currently being calibrated using:

* **Bio-Hermes-001 Dataset**: Utilizing the Global Alzheimer's Platform (GAP) data to correlate digital biomarkers (speech/cognitive) with Aβ PET scan positivity.
* **Proprietary Cohort Data**: User-supplied datasets for fine-tuning voice biomarker sensitivity (hesitation rate, vocabulary richness).

## The Agent Architecture

The system is composed of three specialized agents, each serving as a **Data Sensor**:

### Agent 1: The Cognitive Sensor (Active)
Captures raw digital biomarkers often invisible to human observation.
* **Voice Biomarkers**: Captures audio for Natural Language Processing (NLP) to detect syntactic simplification and hesitation frequency (mapped to Temporal Lobe health).
* **Executive Function**: Interactive Stroop Test measures inhibition latency (ms) and processing speed (mapped to Frontal Lobe health).
* *Implementation*: Web Speech API & High-Precision JS Timers.

### Agent 2: The Genetic Validator
Integrates deterministic risk factors to weight the cognitive signals.
* **APOE Genotyping**: Weights risk scores based on ε4 allele presence.
* **Polygenic Hazard**: (In Development) Ingestion of VCF files for broader variant analysis.

### Agent 3: The Structural Analyst
* **Imaging Pipeline**: Ingestion interface for MRI/CT DICOM files.
* **Analysis**: Pre-processing for ResNet/CNN architectures to detect cortical atrophy and hippocampal volume loss.

## Roadmap: From Collection to Inference

1.  **Phase 1 (Current)**: Deploy "Sensor" frontend to capture standardized inputs (Voice/Reaction Time).
2.  **Phase 2 (Calibration)**: Validate collected metrics against Bio-Hermes baselines.
3.  **Phase 3 (Inference)**: Replace heuristic scoring with trained PyTorch/TensorFlow models served via API.

## Tech Stack

* **Frontend**: React + TypeScript, Vite, Tailwind CSS
* **Sensors**: Web Speech API, Performance.now() (High Resolution Time)
* **Visualization**: Recharts, Framer Motion

## Disclaimer

This software is currently in **Research & Development**. While based on clinical datasets (Bio-Hermes), the current output should be used for data validation and screening research, not as a standalone medical diagnosis tool.
# Local Authority Data Insights
Prototype: https://fe-ruby-ai.netlify.app/

## Overview

This project serves as the front end for an API that delivers statistical analysis and insights for different Local Authorities, focusing on specific indicators. The API integrates with OpenAI's GPT model to generate commentary and insights based on statistical data, providing a user-friendly interface for exploring and analysing important metrics.

## Features

- **Data Fetching**: Fetch specific statistical data and commentary for a given Local Authority and Indicator.
- **Statistical Analysis**: Analyse mortality rates, confidence intervals, z-scores, and other statistical metrics for insights.
- **GPT-Powered Commentary**: Generate GPT-powered commentary with succinct and research-style bullet points on the selected data.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types, making code more predictable and easier to debug.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and modern user interfaces.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/milbot1992/fe-ruby-AI.git
   cd fe-ruby-AI
    ```

1.  Install the necessary dependencies:

    `npm install`

2.  Start the development server:

    `npm start`

3.  Open your browser and navigate to `http://localhost:3000` to view the application.

API Integration
---------------

This front end connects to the following backend APIs:

-   **Fetch Local Authority Data**:
    -   **Endpoint**: `https://ruby-ai-59uig4c9e-millie-ellis-projects.vercel.app/local_authority/{localAuthority}?indicator_name={indicatorName}`
-   **Fetch Available Options**:
    -   **Endpoint**: `https://ruby-ai-59uig4c9e-millie-ellis-projects.vercel.app/available_options`

Developers
------------

Millie Ellis: https://github.com/milbot1992

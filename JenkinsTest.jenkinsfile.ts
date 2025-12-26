// Jenkinsfile  

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // or 'npm install' if no package-lock.json
            }
        }

        stage('Run Specific Playwright Tests') {
            steps {
                sh '''
                    npx playwright test \
                        schedule-missions.test \
                        orbit-global-lockout.test \
                        orbit-lockout-scenarios-static.test \
                        --reporter=html
                '''
            }
        }
    }

    post {
        always {
            // Publish the Playwright HTML report in Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])

            // Optional: Archive report artifacts
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            echo 'All Playwright tests passed!'
        }

        failure {
            echo 'Some tests failed — check the Playwright Test Report.'
        }
    }
}
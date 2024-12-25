pipeline {
    agent any
    
    environment {
        GITHUB_CREDENTIALS = credentials('github-credentials')
        BRANCH_NAME = "${params.BRANCH_NAME ?: 'staging'}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "Starting checkout..."
                checkout scm
            }
        }
        
        stage('Git Info') {
            steps {
                sh '''
                    echo "Git Status:"
                    git status
                    echo "\nCurrent Branch:"
                    git branch
                    echo "\nRemote Info:"
                    git remote -v
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline successful!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
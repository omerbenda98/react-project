pipeline {
    agent any
    
    environment {
        GITHUB_CREDENTIALS = credentials('github-credentials')
        BRANCH_NAME = "${params.BRANCH_NAME ?: 'staging'}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'staging',
                    url: 'https://github.com/omerbenda98/react-project.git',
                    credentialsId: 'github-credentials'
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
pipeline {
    agent any
    options {
        skipDefaultCheckout(true)  // Add this line
    }
    tools {
        nodejs 'nodejs'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_IMAGE = 'omerbenda98/puppy-adoption-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/omerbenda98/react-project.git',
                    branch: 'main',
                    credentialsId: 'github-credentials'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                sh """
                    echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker build -t ${DOCKER_IMAGE}:v1.\${BUILD_NUMBER} .
                    docker push ${DOCKER_IMAGE}:v1.\${BUILD_NUMBER}
                """
            }
            post {
                always {
                    sh 'docker logout'
                }
            }
        }

        stage('Update K8s Manifests') {
            steps {
                sh """
                    set -e  # Exit on any error
                    rm -rf k8s-repo || true
                    git config --global user.email "jenkins@jenkins.com"
                    git config --global user.name "Jenkins"
                    git clone https://\$GITHUB_CREDENTIALS_USR:\$GITHUB_CREDENTIALS_PSW@github.com/omerbenda98/puppy-adoption-k8s.git k8s-repo
                    cd k8s-repo

                    if [ ! -f development/frontend/deployment.yaml ] || [ ! -f production/frontend/deployment.yaml ]; then
                        echo "Deployment files not found!"
                        exit 1
                    fi
                    
                    sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:v1.\${BUILD_NUMBER}|" development/frontend/deployment.yaml
                    sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:v1.\${BUILD_NUMBER}|" production/frontend/deployment.yaml
                    
                    if git diff --quiet; then
                        echo "No changes to commit"
                    else
                        git add development/frontend/deployment.yaml production/frontend/deployment.yaml
                        git commit -m "Update frontend deployment image to v1.\${BUILD_NUMBER}"
                        git push
                    fi
                """
            }
        }
    }
}
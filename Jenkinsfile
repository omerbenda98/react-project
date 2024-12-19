pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_IMAGE = 'omerbenda98/puppy-adoption-frontend'
        GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/omerbenda98/puppy-adoption-frontend.git'
            }
        }
        
        stage('Build and Push Docker Image') {
            steps {
                sh """
                    echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker build -t ${DOCKER_IMAGE}:${GIT_COMMIT} .
                    docker push ${DOCKER_IMAGE}:${GIT_COMMIT}
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
                    git config --global user.email "jenkins@jenkins.com"
                    git config --global user.name "Jenkins"
                    
                    git clone https://\$GITHUB_CREDENTIALS_USR:\$GITHUB_CREDENTIALS_PSW@github.com/omerbenda98/puppy-adoption-k8s.git k8s-repo
                    cd k8s-repo
                    
                    sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${GIT_COMMIT}|" development/frontend/deployment.yaml
                    sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:${GIT_COMMIT}|" production/frontend/deployment.yaml
                    
                    git add development/frontend/deployment.yaml production/frontend/deployment.yaml
                    git commit -m "Update frontend deployment image to ${GIT_COMMIT}"
                    git push
                """
            }
        }
    }
}
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: node
                    image: node:20
                    command:
                    - cat
                    tty: true
                  - name: docker
                    image: docker:latest
                    command:
                    - cat
                    tty: true
                    volumeMounts:
                    - mountPath: /var/run/docker.sock
                      name: docker-sock
                  - name: git
                    image: alpine/git:latest
                    command:
                    - cat
                    tty: true
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            '''
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_TOKEN = credentials('github-token')
        DOCKER_IMAGE = 'omerbenda98/puppy-adoption-frontend'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                container('node') {
                    sh 'npm test'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                container('docker') {
                    sh """
                        echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker build -t ${DOCKER_IMAGE}:\${BUILD_NUMBER} .
                        docker push ${DOCKER_IMAGE}:\${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Update K8s Manifests') {
            steps {
                container('git') {
                    sh """
                        git config --global user.email "jenkins@jenkins.com"
                        git config --global user.name "Jenkins"
                        
                        git clone https://x-access-token:\${GITHUB_TOKEN_PSW}@github.com/omerbenda98/puppy-adoption-k8s.git k8s-repo
                        cd k8s-repo
                        
                        sed -i 's|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:\${BUILD_NUMBER}|' development/frontend/deployment.yaml
                        sed -i 's|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:\${BUILD_NUMBER}|' production/frontend/deployment.yaml
                        
                        git add development/frontend/deployment.yaml production/frontend/deployment.yaml
                        git commit -m "Update frontend deployment image to \${BUILD_NUMBER}"
                        git push
                    """
                }
            }
        }
    }

    post {
        always {
            container('docker') {
                sh 'docker logout'
            }
        }
    }
}
pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_IMAGE = 'omerbenda98/puppy-adoption-frontend'
        BRANCH_NAME = "${params.BRANCH_NAME ?: 'staging'}"
        GIT_PATH = '/usr/bin/git'
    }
    // stages {
    //     stage('Git Setup') {
    //         steps {
    //             dir("${WORKSPACE}") {
    //                 sh """
    //                     # Clean workspace except . and ..
    //                     rm -rf .[!.]* * || true
                        
    //                     # Initialize Git
    //                     ${GIT_PATH} init .
                        
    //                     # Add remote and fetch
    //                     ${GIT_PATH} remote add origin 'https://github.com/omerbenda98/react-project.git'
    //                     ${GIT_PATH} fetch origin ${BRANCH_NAME}
    //                     ${GIT_PATH} checkout -b ${BRANCH_NAME} origin/${BRANCH_NAME}
    //                 """
    //             }
    //         }
    //     }
        
        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "Running tests..."
                sh 'npm test'
            }
        }
        
        stage('Build and Push Docker Image') {
            steps {
                echo "Building and pushing Docker image..."
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
                script {
                    def targetPath = BRANCH_NAME == 'main' ? 'main' : 'staging'
                    def targetNamespace = BRANCH_NAME == 'main' ? 'production' : 'staging'
                    
                    echo "Updating K8s manifests for ${targetNamespace} environment..."
                    
                    sh """
                        rm -rf k8s-repo || true
                        
                        # Initialize new Git repo for k8s
                        ${GIT_PATH} init k8s-repo
                        cd k8s-repo
                        ${GIT_PATH} config --local user.email "jenkins@jenkins.com"
                        ${GIT_PATH} config --local user.name "Jenkins"
                        
                        # Clone k8s repo
                        ${GIT_PATH} remote add origin https://\$GITHUB_CREDENTIALS_USR:\$GITHUB_CREDENTIALS_PSW@github.com/omerbenda98/puppy-adoption-k8s.git
                        ${GIT_PATH} fetch origin ${BRANCH_NAME}
                        ${GIT_PATH} checkout -b ${BRANCH_NAME} origin/${BRANCH_NAME}
                        
                        echo "Updating deployment.yaml..."
                        sed -i "s|image: ${DOCKER_IMAGE}:.*|image: ${DOCKER_IMAGE}:v1.\${BUILD_NUMBER}|" ${targetPath}/frontend/deployment.yaml
                        
                        if ${GIT_PATH} diff --quiet; then
                            echo "No changes to commit"
                        else
                            echo "Committing and pushing changes..."
                            ${GIT_PATH} add ${targetPath}/frontend/deployment.yaml
                            ${GIT_PATH} commit -m "Update frontend image to v1.\${BUILD_NUMBER} in ${targetNamespace}"
                            ${GIT_PATH} push origin ${BRANCH_NAME}
                        fi
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above for details.'
        }
        always {
            cleanWs()
        }
    }
}
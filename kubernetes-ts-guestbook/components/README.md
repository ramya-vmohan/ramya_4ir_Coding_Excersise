Dear Hiring Manager,

Please find the below documentation for the Pulumi Kubernetes Guestbook Monitoring assignment with required prerequisites and steps to deploy.

Thanks.
# Pulumi Kubernetes Guestbook Monitoring Project

## Overview

This project extends the Pulumi Kubernetes Guestbook example by integrating Prometheus and Grafana monitoring into a Kubernetes cluster running on an Ubuntu EC2 instance with k3s.

The implementation includes:

* Guestbook application deployment using Pulumi
* Prometheus monitoring stack
* Grafana visualization dashboard
* Metrics scraping configuration for Guestbook services
* Grafana exposure using NodePort services

---

# Prerequisites

Before deployment, ensure the following are installed on the EC2 instance:

* Docker
* k3s Kubernetes cluster
* kubectl
* Node.js (v20 or later)
* Pulumi CLI

---

# Project Structure

```bash
kubernetes-ts-guestbook/components/
│
├── index.ts
├── monitoring.ts
├── k8sjs.ts
├── package.json
├── Pulumi.yaml
└── README.md
```

---

# Deployment Instructions

## 1. Clone Repository

```bash
unzip kubernetes-ts-guestbook.zip
cd kubernetes-ts-guestbook/components/
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Login to Pulumi

```bash
pulumi login --local
```

## 4. Create Pulumi Stack

```bash
pulumi stack init dev
```

## 5. Deploy Application

```bash
pulumi up
```

Approve the deployment when prompted.

---

# Monitoring Configuration

The monitoring stack is deployed using the `kube-prometheus-stack` Helm chart through Pulumi.

Components installed:

* Prometheus
* Grafana
* Alertmanager
* Node Exporter

The Guestbook frontend service is configured with Prometheus scrape annotations:

```yaml
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"
  prometheus.io/path: "/metrics"
```
http://44.222.110.10:9100/metrics ==> metrics
---

# Grafana Access Details

## Grafana URL
## my public IP for the EC2 instance is 44.222.110.10
```text
http://44.222.110.10:31771/
```

## Credentials

```text
Username: admin
Password: admin123
```

---

# Prometheus Access

## Prometheus URL

```text
http://44.222.110.10:30090/
```

---

# Verify Guestbook Metrics Scraping

1. Open Prometheus in the browser.
2. Navigate to:

```text
Status → Targets
```

3. Verify that Guestbook-related targets appear with the status:

```text
UP
```

4. Open Grafana and verify metrics are visible in dashboards.

---

# Useful Commands

## Check Kubernetes Resources

```bash
kubectl get all -A
```

## Check Monitoring Pods

```bash
kubectl get pods -n monitoring
```

## Check Services

```bash
kubectl get svc -n monitoring
```

---

# Notes

* Services are exposed using NodePort because the deployment runs on a standalone k3s cluster on EC2.
* Prometheus CRDs were installed manually before Helm deployment to avoid CRD initialization issues.

---

# Notes

* Services are exposed using NodePort because the deployment runs on a standalone k3s cluster on EC2.
* Prometheus CRDs were installed manually before Helm deployment to avoid CRD initialization issues.

# ########################################################################################################################################################################################################

# Troubleshooting for this deployment:

As I'm not using loadbalancer services like EKS, I'm going to use "node port" instead of load balancer in k8sjs.ts file which is the config file to keep the pulumi up and running in the port.
thus changed 
>> In k8sjs.ts filehange => type: LoadBalancer to type: NodePort 
>> pulumi refresh
>> pulumi up 
>> kubectl get svc
# Guestbook Application:
http://44.222.110.10:31526/

# Install Prometheus CRDs

As I'm running my application from Ubuntu 26.04 image from EC2 I was required to install prometheus CRDs for enabling the monitoring for guestbook application, you may require the following steps, if you meet this requirement

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagerconfigs.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_alertmanagers.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_podmonitors.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_probes.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_prometheusagents.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_prometheuses.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_prometheusrules.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_scrapeconfigs.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml

>> kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_thanosrulers.yaml

>> kubectl get crds | grep monitoring.coreos.com

>> pulumi refresh

>> pulumi up

>> kubectl get pods -n monitoring

>> kubectl get svc -n monitoring

---


# Author

Ramya Mohan


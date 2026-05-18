import * as k8s from "@pulumi/kubernetes";

const ns = new k8s.core.v1.Namespace("monitoring", {
    metadata: {
        name: "monitoring",
    },
});

const monitoring = new k8s.helm.v3.Chart("kube-prometheus-stack", {
    chart: "kube-prometheus-stack",
    version: "58.2.1",
    fetchOpts: {
        repo: "https://prometheus-community.github.io/helm-charts",
    },
    namespace: ns.metadata.name,
    values: {
        crds: {
            enabled: false,
        },
        grafana: {
            adminPassword: "admin123",
            service: {
                type: "NodePort",
            },
        },
	prometheus: {
        service: {
            type: "NodePort",
        },
    },
    },
});

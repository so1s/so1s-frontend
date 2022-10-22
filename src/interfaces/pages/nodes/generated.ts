// Generated from http://json2ts.com

export interface Annotations {
    'node.alpha.kubernetes.io/ttl': string;
    'volumes.kubernetes.io/controller-managed-attach-detach': string;
}

export interface Labels {
    'beta.kubernetes.io/arch': string;
    'beta.kubernetes.io/instance-type': string;
    'beta.kubernetes.io/os': string;
    'eks.amazonaws.com/capacityType': string;
    'eks.amazonaws.com/nodegroup': string;
    'eks.amazonaws.com/nodegroup-image': string;
    'eks.amazonaws.com/sourceLaunchTemplateId': string;
    'eks.amazonaws.com/sourceLaunchTemplateVersion': string;
    'failure-domain.beta.kubernetes.io/region': string;
    'failure-domain.beta.kubernetes.io/zone': string;
    'k8s.io/cloud-provider-aws': string;
    kind: string;
    'kubernetes.io/arch': string;
    'kubernetes.io/hostname': string;
    'kubernetes.io/os': string;
    'node.kubernetes.io/instance-type': string;
    'topology.kubernetes.io/region': string;
    'topology.kubernetes.io/zone': string;
}

export interface FK8sIoCloudProviderAws {}

export interface FEksAmazonawsComCapacityType {}

export interface FEksAmazonawsComNodegroup {}

export interface FEksAmazonawsComNodegroupImage {}

export interface FEksAmazonawsComSourceLaunchTemplateId {}

export interface FEksAmazonawsComSourceLaunchTemplateVersion {}

export interface FKind {}

export interface FLabels {
    'f:k8s.io/cloud-provider-aws': FK8sIoCloudProviderAws;
    'f:eks.amazonaws.com/capacityType': FEksAmazonawsComCapacityType;
    'f:eks.amazonaws.com/nodegroup': FEksAmazonawsComNodegroup;
    'f:eks.amazonaws.com/nodegroup-image': FEksAmazonawsComNodegroupImage;
    'f:eks.amazonaws.com/sourceLaunchTemplateId': FEksAmazonawsComSourceLaunchTemplateId;
    'f:eks.amazonaws.com/sourceLaunchTemplateVersion': FEksAmazonawsComSourceLaunchTemplateVersion;
    'f:kind': FKind;
}

export interface FNodeAlphaKubernetesIoTtl {}

export interface FAnnotations {
    'f:node.alpha.kubernetes.io/ttl': FNodeAlphaKubernetesIoTtl;
}

export interface FMetadata {
    'f:labels': FLabels;
    'f:annotations': FAnnotations;
}

export interface FTaints {}

export interface FSpec {
    'f:taints': FTaints;
}

export interface FLastTransitionTime {}

export interface FMessage {}

export interface FReason {}

export interface FStatus2 {}

export interface FLastHeartbeatTime {}

export interface KTypeReady {
    'f:lastTransitionTime': FLastTransitionTime;
    'f:message': FMessage;
    'f:reason': FReason;
    'f:status': FStatus2;
    'f:lastHeartbeatTime': FLastHeartbeatTime;
}

export interface FLastHeartbeatTime2 {}

export interface KTypeDiskPressure {
    'f:lastHeartbeatTime': FLastHeartbeatTime2;
}

export interface FLastHeartbeatTime3 {}

export interface KTypeMemoryPressure {
    'f:lastHeartbeatTime': FLastHeartbeatTime3;
}

export interface FLastHeartbeatTime4 {}

export interface KTypePIDPressure {
    'f:lastHeartbeatTime': FLastHeartbeatTime4;
}

export interface FConditions {
    'k:{"type":"Ready"}': KTypeReady;
    'k:{"type":"DiskPressure"}': KTypeDiskPressure;
    'k:{"type":"MemoryPressure"}': KTypeMemoryPressure;
    'k:{"type":"PIDPressure"}': KTypePIDPressure;
}

export interface FNvidiaComGpu {}

export interface FAllocatable {
    'f:nvidia.com/gpu': FNvidiaComGpu;
}

export interface FNvidiaComGpu2 {}

export interface FCapacity {
    'f:nvidia.com/gpu': FNvidiaComGpu2;
}

export interface FImages {}

export interface FStatus {
    'f:conditions': FConditions;
    'f:allocatable': FAllocatable;
    'f:capacity': FCapacity;
    'f:images': FImages;
}

export interface FieldsV1 {
    'f:metadata': FMetadata;
    'f:spec': FSpec;
    'f:status': FStatus;
}

export interface ManagedField {
    apiVersion: string;
    fieldsType: string;
    fieldsV1: FieldsV1;
    manager: string;
    operation: string;
    time: Date;
    subresource: string;
}

export interface Metadata {
    annotations: Annotations;
    creationTimestamp: Date;
    labels: Labels;
    managedFields: ManagedField[];
    name: string;
    resourceVersion: string;
    uid: string;
}

export interface Taint {
    effect: string;
    key: string;
    value: string;
}

export interface Spec {
    providerID: string;
    taints: Taint[];
}

export interface Address {
    address: string;
    type: string;
}

export interface Allocatable {
    'attachable-volumes-aws-ebs': string;
    cpu: string;
    'ephemeral-storage': string;
    'hugepages-1Gi': string;
    'hugepages-2Mi': string;
    memory: string;
    'nvidia.com/gpu': string;
    pods: string;
}

export interface Capacity {
    'attachable-volumes-aws-ebs': string;
    cpu: string;
    'ephemeral-storage': string;
    'hugepages-1Gi': string;
    'hugepages-2Mi': string;
    memory: string;
    'nvidia.com/gpu': string;
    pods: string;
}

export interface Condition {
    lastHeartbeatTime: Date;
    lastTransitionTime: Date;
    message: string;
    reason: string;
    status: string;
    type: string;
}

export interface KubeletEndpoint {
    Port: number;
}

export interface DaemonEndpoints {
    kubeletEndpoint: KubeletEndpoint;
}

export interface Image {
    names: string[];
    sizeBytes: number;
}

export interface NodeInfo {
    architecture: string;
    bootID: string;
    containerRuntimeVersion: string;
    kernelVersion: string;
    kubeProxyVersion: string;
    kubeletVersion: string;
    machineID: string;
    operatingSystem: string;
    osImage: string;
    systemUUID: string;
}

export interface Status {
    addresses: Address[];
    allocatable: Allocatable;
    capacity: Capacity;
    conditions: Condition[];
    daemonEndpoints: DaemonEndpoints;
    images: Image[];
    nodeInfo: NodeInfo;
}

export interface RootObject {
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: Spec;
    status: Status;
}

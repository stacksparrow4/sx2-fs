docker buildx build --platform linux/arm64 -t stacksparrow4/priv:sx2-fs --push .
kubectl rollout restart deployment/sx2-fs
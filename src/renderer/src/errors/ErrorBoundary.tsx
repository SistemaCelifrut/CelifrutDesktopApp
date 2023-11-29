import React from "react";

type Props = {
  fallback: React.ReactNode,
  children: React.ReactNode
}

class ErrorBoundary extends React.Component<Props> {
    state = { hasError: false}

    static getDerivedStateFromError(error) {
        return { hasError: true}
    } 

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo)
    }

    render(): React.ReactNode {
        if(this.props.fallback){
            return this.props.fallback
        }
        return this.props.children
    }
}

export default ErrorBoundary

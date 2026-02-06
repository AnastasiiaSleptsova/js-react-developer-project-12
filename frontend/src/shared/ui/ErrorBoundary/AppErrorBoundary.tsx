import { Component, type ErrorInfo, type ReactNode } from 'react'
import type Rollbar from 'rollbar'

import { ErrorBoundaryFallback } from './ErrorBoundary'

type AppErrorBoundaryProps = {
  children: ReactNode
  rollbar?: Rollbar | null
}

type AppErrorBoundaryState = {
  error: Error | null
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (this.props.rollbar) {
      this.props.rollbar.error(error, { info })
    }
    // дублируем в консоль для удобства разработки

    console.error('Caught by AppErrorBoundary', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return <ErrorBoundaryFallback error={error} resetError={this.handleReset} />
    }

    return children
  }
}

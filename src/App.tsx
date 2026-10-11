import { Component, useEffect, type ErrorInfo, type ReactNode } from "react";
import { AppProvider, useApp } from "./lib/store";
import { TopBar } from "./components/TopBar";
import { FlowTrail } from "./components/FlowTrail";
import { BottomNav } from "./components/Shell";
import { Toast } from "./components/Toast";
import { PrototypePanel } from "./components/PrototypePanel";
import { IconAlert, IconLock, IconRefresh } from "./lib/icons";
import { Button, Card, Pill } from "./components/ui";
import { cn } from "./utils/cn";

// Screens
import { Home } from "./screens/Home";
import { Processing } from "./screens/Processing";
import { Understanding } from "./screens/Understanding";
import { Result } from "./screens/Result";
import { Decision } from "./screens/Decision";
import { Blocked } from "./screens/Blocked";
import { Projects } from "./screens/Projects";
import { Compare } from "./screens/Compare";
import { Style } from "./screens/Style";
import { Settings } from "./screens/Settings";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

/**
 * Defensive Error Boundary to prevent crashes and sanitize error displays
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const msg = error instanceof Error ? error.message : "An unexpected application error occurred.";
    return { hasError: true, errorMessage: msg };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    // Defensive logging without leaking sensitive properties
    if (typeof console !== "undefined" && console.error) {
      console.error("Destill captured isolated component error:", error, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
    if (typeof window !== "undefined") {
      window.location.hash = "";
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100dvh] items-center justify-center p-6 bg-[#edf0f5] text-[#1c2434]">
          <Card className="flex max-w-[500px] flex-col items-center p-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#cc3d61]/15 text-[#cc3d61] mb-4">
              <IconAlert size={32} />
            </span>
            <Pill tone="rose" dot>Session Recovered</Pill>
            <h2 className="mt-4 text-[22px] font-bold tracking-tight">Something unexpected occurred</h2>
            <p className="mt-2 text-[14px] text-[#4a566d]">
              The prototype safely caught an error. Your local files remain untouched.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                variant="primary"
                size="md"
                icon={<IconRefresh size={15} />}
                onClick={this.handleReset}
              >
                Reset Prototype
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

function ScreenRouter() {
  const { screen } = useApp();

  switch (screen) {
    case "home":
      return <Home />;
    case "processing":
      return <Processing />;
    case "understanding":
      return <Understanding />;
    case "result":
      return <Result />;
    case "decision":
      return <Decision />;
    case "blocked":
      return <Blocked />;
    case "projects":
      return <Projects />;
    case "compare":
      return <Compare />;
    case "style":
      return <Style />;
    case "settings":
      return <Settings />;
    default:
      return <Home />;
  }
}

function MainLayout() {
  const { lang, calmMotion, t } = useApp();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <div className={cn("relative min-h-[100dvh] flex flex-col text-[#1c2434]", calmMotion && "calm")}>
      <TopBar />
      <FlowTrail />

      {/* Main Workspace Frame */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-4 py-2 lg:px-8">
        <main className="screen-in min-w-0 w-full pb-24 lg:pb-16">
          <ScreenRouter />
        </main>
      </div>

      {/* Subordinate Footer */}
      <footer className="mx-auto w-full max-w-[1440px] px-6 py-4 text-center text-[12px] font-medium text-[#6b7791]">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5">
            <IconLock size={13} />
            {t("localGuarantee")}
          </span>
          <span>•</span>
          <span>Destill v0.2 Hybrid Interactive Prototype</span>
          <span>•</span>
          <span>Ana Creator Context</span>
        </div>
      </footer>

      <BottomNav />
      <Toast />
      <PrototypePanel />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}

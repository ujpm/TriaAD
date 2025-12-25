import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/pages/LandingPage';
import { AboutPage } from './components/pages/AboutPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { HomeScreen } from './components/screens/HomeScreen';
import { NeuralScreen } from './components/screens/NeuralScreen';
import { CognitiveAssessmentScreen, CognitiveAssessmentData } from './components/screens/CognitiveAssessmentScreen';
import { GeneticScreen } from './components/screens/GeneticScreen';
import { StructuralScreen } from './components/screens/StructuralScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';

type Page = 'landing' | 'about' | 'privacy' | 'terms' | 'login' | 'register' | 'profile' | 'app';
type Screen = 'home' | 'cognitive' | 'cognitiveResults' | 'genetic' | 'geneticResults' | 'structural' | 'finalResults';

interface AgentData {
  cognitive?: CognitiveAssessmentData;
  genetic?: any;
  structural?: any;
}

const STORAGE_CURRENT_AGENT_DATA_KEY = 'triad_currentAgentData';
const STORAGE_LATEST_AGENT_DATA_KEY = 'triad_latestAgentData';

const safeParseJson = <T,>(raw: string | null): T | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [agentData, setAgentData] = useState<AgentData>(() => {
    const restored = safeParseJson<AgentData>(localStorage.getItem(STORAGE_CURRENT_AGENT_DATA_KEY));
    return restored ?? {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_CURRENT_AGENT_DATA_KEY, JSON.stringify(agentData));
  }, [agentData]);

  const persistLatest = (data: AgentData) => {
    localStorage.setItem(STORAGE_LATEST_AGENT_DATA_KEY, JSON.stringify(data));
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    if (page === 'app') {
      setCurrentScreen('home');
      setAgentData({}); // Reset data when starting fresh
    }
  };

  const handleInitiateScan = () => {
    setCurrentScreen('cognitive');
  };

  const handleCognitiveComplete = (data: CognitiveAssessmentData) => {
    const enriched = { ...data, timestamp: new Date().toISOString() };
    const next = { cognitive: enriched };
    setAgentData(next);
    persistLatest(next);
    setCurrentScreen('cognitiveResults');
  };

  const handleProceedToGenetic = () => {
    setCurrentScreen('genetic');
  };

  const handleGeneticComplete = (data: any) => {
    setAgentData(prev => {
      const next = { ...prev, genetic: data };
      persistLatest(next);
      return next;
    });
    setCurrentScreen('geneticResults');
  };

  const handleProceedToStructural = () => {
    setCurrentScreen('structural');
  };

  const handleStructuralComplete = (data: any) => {
    setAgentData(prev => {
      const next = { ...prev, structural: data };
      persistLatest(next);
      return next;
    });
    setCurrentScreen('finalResults');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setAgentData({});
  };

  const handleBackToCognitiveResults = () => {
    setCurrentScreen('cognitiveResults');
  };

  const handleBackToGeneticResults = () => {
    setCurrentScreen('geneticResults');
  };

  // Render pages (landing, about, privacy, terms)
  if (currentPage === 'landing') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <LandingPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'about') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <AboutPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <PrivacyPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'terms') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <TermsPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <LoginPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <RegisterPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'profile') {
    return (
      <>
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <ProfilePage onNavigate={handleNavigate} />
      </>
    );
  }

  // Render app screens
  if (currentPage === 'app') {
    if (currentScreen === 'cognitive') {
      return (
        <CognitiveAssessmentScreen
          onBack={handleBackToHome}
          onComplete={handleCognitiveComplete}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentScreen === 'cognitiveResults') {
      return (
        <ResultsScreen 
          data={agentData}
          onNavigate={handleNavigate}
          onProceedToGenetic={handleProceedToGenetic}
          onBackToHome={handleBackToHome}
        />
      );
    }

    if (currentScreen === 'genetic') {
      return (
        <GeneticScreen 
          onBack={handleBackToCognitiveResults} 
          onComplete={handleGeneticComplete} 
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentScreen === 'geneticResults') {
      return (
        <ResultsScreen 
          data={agentData}
          onNavigate={handleNavigate}
          onProceedToStructural={handleProceedToStructural}
          onBackToHome={handleBackToHome}
        />
      );
    }

    if (currentScreen === 'structural') {
      return (
        <StructuralScreen 
          onBack={handleBackToGeneticResults} 
          onComplete={handleStructuralComplete} 
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentScreen === 'finalResults') {
      return (
        <ResultsScreen 
          data={agentData}
          onNavigate={handleNavigate}
          onBackToHome={handleBackToHome}
        />
      );
    }

    return <HomeScreen onInitiateScan={handleInitiateScan} onNavigate={handleNavigate} />;
  }

  return <LandingPage onNavigate={handleNavigate} />;
}
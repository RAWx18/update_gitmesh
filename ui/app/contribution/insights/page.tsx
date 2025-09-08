'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRepository } from '@/contexts/RepositoryContext';
import { useBranch } from '@/contexts/BranchContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { InsightsView } from '@/components/hub/insights/InsightsView';

export default function InsightsPage() {
  const { isAuthenticated, token } = useAuth();
  const { repository, isRepositoryLoaded } = useRepository();
  const { selectedBranch } = useBranch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle authentication and repository checks
  useEffect(() => {
    // Wait for auth and repository context to load
    if (!isAuthenticated && isRepositoryLoaded) {
      console.log('Not authenticated, redirecting to landing page');
      router.push('/');
      return;
    }

    // If authenticated but no repository, redirect to main contribution page
    if (isAuthenticated && isRepositoryLoaded && !repository) {
      console.log('No repository selected, redirecting to contribution page');
      router.push('/contribution');
      return;
    }

    // If we have both auth and repository, we're ready
    if (isAuthenticated && repository) {
      setLoading(false);
    }
  }, [isAuthenticated, repository, isRepositoryLoaded, router]);



  // Show loading state while contexts are initializing
  if (loading || !isRepositoryLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading insights...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Insights view with full functionality
  return (
    <div className="container mx-auto px-4 py-8">
      <InsightsView
        onError={(error) => {
          console.error('Insights page error:', error);
          setError(error.message);
        }}
        onLoading={(isLoading) => {
          // Handle loading state from InsightsView
        }}
      />
    </div>
  );
}
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Repository } from '@/lib/github-api';
import { Star, GitFork, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  repo: Repository;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const handleOpenInBeetle = () => {
    // TODO: Implement the functionality to open the project in Beetle
    console.log(`Opening ${repo.name} in Beetle`);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{repo.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{repo.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="h-4 w-4 mr-1" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.open(repo.html_url, '_blank')}>
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleOpenInBeetle}>
            Open in Beetle
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FileText, Calendar, Users, Award, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Publication } from "@shared/schema";

export default function PublicationsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data: publications = [], isLoading, error } = useQuery({
    queryKey: ['/api/publications'],
  });

  const filteredPublications = publications.filter((pub: Publication) => {
    const matchesSearch = searchTerm === "" || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.keywords && pub.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesYear = selectedYear === null || pub.year === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  const conferencePublications = filteredPublications.filter((pub: Publication) => pub.type === 'conference');
  const journalPublications = filteredPublications.filter((pub: Publication) => pub.type === 'journal');

  const years = [...new Set(publications.map((pub: Publication) => pub.year))].sort((a, b) => b - a);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-catppuccin-green text-catppuccin-base';
      case 'accepted': return 'bg-catppuccin-blue text-catppuccin-base';
      case 'under_review': return 'bg-catppuccin-yellow text-catppuccin-base';
      default: return 'bg-catppuccin-surface2 text-catppuccin-text';
    }
  };

  const PublicationCard = ({ publication }: { publication: Publication }) => (
    <div className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0 hover:border-catppuccin-blue transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg text-catppuccin-blue mb-2 leading-tight">{publication.title}</h3>
          <div className="flex items-center text-catppuccin-subtext1 text-sm mb-2">
            <Users size={14} className="mr-1" />
            <span>{publication.authors}</span>
          </div>
          <div className="flex items-center text-catppuccin-subtext1 text-sm mb-2">
            <FileText size={14} className="mr-1" />
            <span className="text-catppuccin-green">{publication.venue}</span>
          </div>
          <div className="flex items-center text-catppuccin-subtext1 text-sm mb-3">
            <Calendar size={14} className="mr-1" />
            <span>{publication.year}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <Badge className={getStatusColor(publication.status || 'published')}>
            {publication.status || 'published'}
          </Badge>
          <Badge variant="outline" className="text-catppuccin-blue border-catppuccin-surface2">
            {publication.type}
          </Badge>
        </div>
      </div>

      {publication.abstract && (
        <p className="text-catppuccin-subtext1 text-sm mb-4 leading-relaxed">
          {publication.abstract}
        </p>
      )}

      {publication.keywords && publication.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.keywords.map((keyword, index) => (
            <span key={index} className="px-2 py-1 bg-catppuccin-surface1 text-catppuccin-text text-xs rounded">
              {keyword}
            </span>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        {publication.doi && (
          <a 
            href={`https://doi.org/${publication.doi}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-catppuccin-green hover:text-catppuccin-lavender transition-colors text-sm flex items-center gap-1"
          >
            <ExternalLink size={14} />
            [DOI]
          </a>
        )}
        {publication.pdfUrl && (
          <a 
            href={publication.pdfUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-catppuccin-yellow hover:text-catppuccin-lavender transition-colors text-sm flex items-center gap-1"
          >
            <FileText size={14} />
            [PDF]
          </a>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <section>
        <div className="mb-6">
          <div className="text-catppuccin-green">$ find publications/ -type f -name "*.pdf"</div>
        </div>
        <div className="text-catppuccin-subtext1">Loading publications...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="mb-6">
          <div className="text-catppuccin-green">$ find publications/ -type f -name "*.pdf"</div>
        </div>
        <div className="text-catppuccin-red">Error loading publications. Please try again.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ find publications/ -type f -name "*.pdf"</div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-catppuccin-overlay0" />
              <Input
                type="text"
                placeholder="Search publications, authors, venues, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-catppuccin-surface1 border-catppuccin-surface2 text-catppuccin-text focus:border-catppuccin-blue"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedYear === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear(null)}
              className={selectedYear === null ? 
                "bg-catppuccin-blue text-catppuccin-base" : 
                "text-catppuccin-subtext1 border-catppuccin-surface2"
              }
            >
              All Years
            </Button>
            {years.map(year => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
                className={selectedYear === year ? 
                  "bg-catppuccin-blue text-catppuccin-base" : 
                  "text-catppuccin-subtext1 border-catppuccin-surface2"
                }
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications Summary */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded text-center">
          <div className="text-2xl text-catppuccin-blue font-bold">{publications.length}</div>
          <div className="text-catppuccin-subtext1 text-sm">Total Publications</div>
        </div>
        <div className="p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded text-center">
          <div className="text-2xl text-catppuccin-green font-bold">
            {publications.filter((p: Publication) => p.type === 'conference').length}
          </div>
          <div className="text-catppuccin-subtext1 text-sm">Conference Papers</div>
        </div>
        <div className="p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded text-center">
          <div className="text-2xl text-catppuccin-yellow font-bold">
            {publications.filter((p: Publication) => p.type === 'journal').length}
          </div>
          <div className="text-catppuccin-subtext1 text-sm">Journal Articles</div>
        </div>
        <div className="p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded text-center">
          <div className="text-2xl text-catppuccin-mauve font-bold">
            {years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0}
          </div>
          <div className="text-catppuccin-subtext1 text-sm">Years Active</div>
        </div>
      </div>

      {/* Publications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-catppuccin-surface0 border border-catppuccin-surface1">
          <TabsTrigger value="all" className="data-[state=active]:bg-catppuccin-blue data-[state=active]:text-catppuccin-base">
            All Publications ({filteredPublications.length})
          </TabsTrigger>
          <TabsTrigger value="conference" className="data-[state=active]:bg-catppuccin-green data-[state=active]:text-catppuccin-base">
            Conference Papers ({conferencePublications.length})
          </TabsTrigger>
          <TabsTrigger value="journal" className="data-[state=active]:bg-catppuccin-yellow data-[state=active]:text-catppuccin-base">
            Journal Articles ({journalPublications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((publication: Publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))
            ) : (
              <div className="text-center py-12 text-catppuccin-subtext1">
                <Award size={48} className="mx-auto mb-4 text-catppuccin-overlay0" />
                <p>No publications found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="conference" className="mt-6">
          <div className="space-y-6">
            {conferencePublications.length > 0 ? (
              conferencePublications.map((publication: Publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))
            ) : (
              <div className="text-center py-12 text-catppuccin-subtext1">
                <Award size={48} className="mx-auto mb-4 text-catppuccin-overlay0" />
                <p>No conference publications found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="journal" className="mt-6">
          <div className="space-y-6">
            {journalPublications.length > 0 ? (
              journalPublications.map((publication: Publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))
            ) : (
              <div className="text-center py-12 text-catppuccin-subtext1">
                <Award size={48} className="mx-auto mb-4 text-catppuccin-overlay0" />
                <p>No journal publications found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
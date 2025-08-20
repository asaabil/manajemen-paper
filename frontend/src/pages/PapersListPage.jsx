    import React, { useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { usePaper } from '../context/PaperContext';
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"; // <-- Impor komponen Card

    const PapersListPage = () => {
      const { papers, loading, getPapers } = usePaper();

      useEffect(() => {
        getPapers();
        // eslint-disable-next-line
      }, []);

      if (loading) {
        return <div className="container mx-auto p-4">Loading paper...</div>;
      }

      return (
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Perpustakaan Paper</h1>
          
          {papers.length > 0 ? (
            // Gunakan CSS Grid untuk layout kartu yang responsif
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {papers.map((paper) => (
                // Setiap paper sekarang adalah sebuah Card
                <Card key={paper._id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="hover:text-primary">
                      <Link to={`/papers/${paper._id}`}>
                        {paper.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {paper.authors.join(', ')} - {paper.publicationYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {paper.abstract}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold">Belum Ada Paper</h2>
              <p className="text-muted-foreground mt-2">
                Saat ini belum ada paper yang diunggah. Jadilah yang pertama!
              </p>
            </div>
          )}
        </div>
      );
    };

    export default PapersListPage;
    
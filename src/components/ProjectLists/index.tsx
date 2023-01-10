import React from 'react';
import { Empty } from '@components/Collection/Empty';
import { Project } from '@interfaces/project';
import { ProjectCard } from '@components/ProjectCard';

export const ProjectList = ({ listData }: { listData?: Project[] }) => {
  return (
    <>
      {listData && listData?.length > 0 ? (
        <div className="grid grid-cols-4">
          {listData?.map((project, index: number) => (
            <ProjectCard key={`project-item-${index}`} project={project} />
          ))}
        </div>
      ) : (
        listData && <Empty />
      )}
    </>
  );
};

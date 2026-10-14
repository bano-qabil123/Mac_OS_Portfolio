import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();

  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    const draggables = Draggable.create(".folder");
    // Clean up on unmount (React Strict Mode double-invokes effects)
    return () => draggables.forEach((d) => d.kill());
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.name} project`}
            onDoubleClick={() => handleOpenProjectFinder(project)}
            onKeyDown={(e) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              handleOpenProjectFinder(project);
            }}
          >
            <img src={`${import.meta.env.BASE_URL}images/folder.png`} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const skills = {
  frontend: [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "HTML/CSS", level: 95 },
  ],
  backend: [
    { name: "Node.js", level: 75 },
    { name: "Express.js", level: 70 },
    { name: "REST APIs", level: 85 },
  ],
  database: [
    { name: "PostgreSQL", level: 75 },
    { name: "MySQL", level: 70 },
    { name: "Prisma", level: 80 },
  ],
};

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Skills</h2>
            <p className="text-lg text-muted-foreground">
              Technical expertise and proficiencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-xl font-semibold capitalize">{category}</h3>
                <div className="space-y-4">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

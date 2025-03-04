import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "JewellerERP",
    description: "Comprehensive ERP solution for jewelry industry managing inventory, orders, and sales through a robust admin panel.",
  },
  {
    title: "Conversation Tool",
    description: "Data mapping tool for Excel integration with Zoho, Xero, and Odoo platforms.",
  },
  {
    title: "Storytelling with AI",
    description: "Interactive storytelling platform for children using AI to generate personalized stories.",
  },
  {
    title: "TaxFAQ",
    description: "User-friendly web application providing tax-related information using React.js.",
  },
  {
    title: "HRA",
    description: "Scalable admin panel for managing glossary store with robust security.",
  },
  {
    title: "TallyToOdoo",
    description: "Solution for converting XML data from Tally to Odoo with seamless integration.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">Projects</h2>
            <p className="text-lg text-muted-foreground">
              Showcase of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional frontend developer specializing in React.js and Next.js, 
              with a strong foundation in full-stack development. Passionate about 
              creating engaging user experiences and optimizing application performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-lg">Experience</h3>
                <p className="text-muted-foreground">
                  3+ years of professional experience in web development
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-lg">Education</h3>
                <p className="text-muted-foreground">
                  Bachelor of Engineering from Shri J. M. Sabva Institute
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-muted-foreground">
                  Limbdi, Gujarat, India
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

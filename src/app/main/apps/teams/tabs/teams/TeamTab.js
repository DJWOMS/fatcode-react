import { motion } from 'framer-motion';
import TeamsWidget from './widgets/TeamsWidget';

function TeamTab() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="widget flex w-full">
        <TeamsWidget />
      </motion.div>
    </motion.div>
  );
}

export default TeamTab;

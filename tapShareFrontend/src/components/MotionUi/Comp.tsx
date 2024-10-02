import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { FormDescription, FormMessage } from "../ui/form";

const MotionDialogContent = motion.create(DialogContent);
const MotionDialogOverlay = motion.create(DialogOverlay);
const MotionDialogTitle = motion.create(DialogTitle);
const MotionDialogDescription = motion.create(DialogDescription);
const MotionDialogTrigger = motion.create(DialogTrigger);
const MotionDialogClose = motion.create(DialogClose);

export {
  MotionDialogContent,
  MotionDialogOverlay,
  MotionDialogTitle,
  MotionDialogDescription,
  MotionDialogTrigger,
  MotionDialogClose,
};

// input
const MotionInput = motion.create(Input);
const MotionButton = motion.create(Button);

export { MotionInput, MotionButton };
// form
const MotionFormDescription = motion.create(FormDescription);
const MotionFormMessage = motion.create(FormMessage);
export { MotionFormDescription, MotionFormMessage };

// --- inintal layout
// layout
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0 }}

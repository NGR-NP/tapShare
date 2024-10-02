import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  MotionButton,
  MotionFormDescription,
  MotionInput,
} from "@/components/MotionUi/Comp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  MotionCardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  searchCode: z.string().min(2).max(50),
});

export function ExpandableCardDemo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchCode: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [open, setOpen] = useState(false);
  const handleInputClick = () => {
    setOpen(!open);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
            onClick={handleDialogClose}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        <MotionInput
          layoutId="code-search-input"
          onClick={handleInputClick}
          readOnly
          placeholder="Search Code"
          className="mx-auto max-w-sm"
        />
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <div className="fixed left-[50%] top-[10%] z-50 w-full max-w-lg translate-x-[-50%] sm:max-w-[425px]">
            <Card
              className={cn(
                open
                  ? "animate-in slide-in-from-bottom-1/4"
                  : "animate-out slide-out-to-bottom-10",
                "duration-500"
              )}
            >
              <CardHeader>
                <MotionCardTitle
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-semibold leading-none tracking-tight"
                >
                  Search Files or Text
                </MotionCardTitle>
              </CardHeader>
              <Form {...form}>
                <motion.form
                  layoutId="code-search-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="searchCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <MotionInput
                              layoutId="code-search-input"
                              placeholder="Search Code"
                              autoFocus
                              {...field}
                            />
                          </FormControl>
                          <MotionFormDescription
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Enter the sender code (e.g.'345678') to search for
                            files/text shared by that sender.
                          </MotionFormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <MotionButton
                      onClick={handleDialogClose}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="button"
                      variant="outline"
                    >
                      Cancel
                    </MotionButton>
                    <MotionButton
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="submit"
                    >
                      Search
                    </MotionButton>
                  </CardFooter>
                </motion.form>
              </Form>
            </Card>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

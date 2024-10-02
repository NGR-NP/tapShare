import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomButton } from "@/components/Custom/CustomButton";
import { MotionDialogTitle, MotionInput } from "@/components/MotionUi/Comp";
import IconSearch from "@/components/icon/SearchIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  searchCode: z
    .string({ required_error: "Please enter the Shared Code!!!" })
    .trim()
    .min(3, { message: "invalid, re-check the shared code!!!" })
    .max(20, { message: "invalid Shared code length" }),
});

export function SearchCodeInputDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchCode: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    throw new Error("not implemented");
  }
  return (
    <Dialog>
      <AnimatePresence>
        <DialogTrigger asChild>
          <motion.div
            layoutId="code-search-input-wrap"
            className="relative mx-auto max-w-[16rem]"
          >
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <MotionInput
              placeholder="Search Code"
              readOnly
              autoComplete="off"
              className="w-full cursor-pointer rounded-lg bg-background pl-8"
            />
          </motion.div>
        </DialogTrigger>
      </AnimatePresence>
      <AnimatePresence>
        <DialogContent className="top-[calc(100dvh_-_80%)] w-[92dvw] translate-y-0 rounded-md data-[state=closed]:duration-0 data-[state=open]:duration-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-2/3 data-[state=open]:slide-in-from-bottom-[55%] sm:top-[16%] sm:max-w-[425px] sm:data-[state=open]:slide-in-from-bottom-2/4">
          <DialogHeader>
            <MotionDialogTitle layoutId="code-seard-card-title">
              Search Files or Text
            </MotionDialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="searchCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        layoutId="code-search-input-wrap"
                        className="relative ml-auto flex-1 md:grow-0"
                      >
                        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <MotionInput
                          placeholder="Search Code"
                          autoFocus
                          autoComplete="off"
                          // reminder if error animation is not working check FormControl  for this className className={cn(error && "is-error", "group")}
                          className="w-full rounded-lg bg-background pl-8 group-[.is-error]:animate-shake group-[.is-error]:border-destructive group-[.is-error]:ring-destructive group-[.is-error]:duration-200"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Enter the sender code (e.g.'345678') to search for
                      files/text shared by that sender.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <DialogFooter className="flex-col gap-x-2 gap-y-2 sm:flex-row-reverse sm:justify-start">
                <CustomButton type="submit">Search</CustomButton>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
}

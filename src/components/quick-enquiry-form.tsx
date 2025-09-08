'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  department: z.string({
    required_error: 'Please select a department to contact.',
  }),
});

export function QuickEnquiryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Enquiry Submitted!',
      description: "We've received your request and will be in touch shortly.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Phone Number *</FormLabel>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-input bg-secondary px-3 text-muted-foreground">
              +91
            </span>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    className="rounded-l-none"
                    {...field}
                  />
                </FormControl>
              )}
            />
          </div>
          <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
        </FormItem>

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Department to Contact</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="general">General Enquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="outline">Submit</Button>
      </form>
    </Form>
  );
}

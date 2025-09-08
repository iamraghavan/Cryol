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
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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

// Determine if the context is a page with dark form elements
const isDarkForm = () => {
    if(typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/contact') ? false : true;
}

export function QuickEnquiryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const darkForm = isDarkForm();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Enquiry Submitted!',
      description: "We've received your request and will be in touch shortly.",
    });
    form.reset();
  }

  const labelClass = darkForm ? 'text-white' : '';
  const inputClass = darkForm ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:ring-primary' : 'bg-background';
  const phoneInputClass = darkForm ? 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white/20 border-white/30 text-white [&_input]:bg-transparent [&_input]:text-white [&_input]:placeholder:text-gray-400 [&_select]:bg-gray-800' : 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
  const selectTriggerClass = darkForm ? 'bg-white/20 border-white/30 text-white placeholder:text-gray-400 focus:ring-primary' : '';
  const selectContentClass = darkForm ? 'bg-gray-800 text-white border-gray-700' : '';


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Name *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className={inputClass} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Phone Number *</FormLabel>
                <FormControl>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    {...field}
                    className={phoneInputClass}
                  />
                </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.phone?.message}</FormMessage>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Select Department to Contact</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="application-development">Application Development</SelectItem>
                  <SelectItem value="cloud-services">Cloud Services</SelectItem>
                  <SelectItem value="cyber-forensics">Cyber Forensics</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-xl">Submit</Button>
      </form>
    </Form>
  );
}

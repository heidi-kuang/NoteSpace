import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/types/form";

const formSchema = z.object({
  marginRatio: z
    .number()
    .min(0.1, { message: "Margin must be at least 0.1" })
    .max(1.0, { message: "Margin cannot exceed 1.0" }),
  clipRHS: z
    .number()
    .min(0.0)
    .max(1.0),
  anchor: z.enum(["left", "center", "right"]),
});

interface SettingsFormProps {
  onSubmit: (data: FormValues) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marginRatio: 0.5,
      clipRHS: 0.0,
      anchor: "left",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("Button clicked");
            console.log("SettingsForm data:", data);
            onSubmit(data);
          },
          (errors) => console.error("SettingsForm errors:", errors)
        )
        }
        className="space-y-4"
      >
        <h1>SettingsForm</h1>
        {/* Margin Ratio Input */}
        <FormField
          control={form.control}
          name="marginRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Margin Ratio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1.0"
                  value={field.value}
                  onChange={(e) => form.setValue("marginRatio", parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Clip RHS Input */}
        <FormField
          control={form.control}
          name="clipRHS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clip RHS</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0.0"
                  max="1.0"
                  value={field.value}
                  onChange={(e) => form.setValue("clipRHS", parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Anchor Selection */}
        <FormField
          control={form.control}
          name="anchor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anchor Position</FormLabel>
              <FormControl>
                <select {...field} className="border p-2 rounded">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Upload & Process</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
  clipLHS: z
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
      clipLHS: 0.0,
      anchor: "left",
    },
  });

  return (
    // <Card className="p-6 max-w-lg mx-auto shadow-lg bg-white">
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>
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
          {/* Margin Ratio Input */}
          <FormField
            control={form.control}
            name="marginRatio"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <FormLabel className="text-right">Margin Ratio</FormLabel>
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
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <FormLabel className="text-right">Clip RHS</FormLabel>
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

          {/* Clip LHS Input */}
          <FormField
            control={form.control}
            name="clipLHS"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <FormLabel className="text-right">Clip LHS</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.0"
                    max="1.0"
                    value={field.value}
                    onChange={(e) => form.setValue("clipLHS", parseFloat(e.target.value))}
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
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <FormLabel className="text-right">Anchor Position</FormLabel>
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
    {/* </Card> */}
    </div>
  );
};

export default SettingsForm;

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/types/form";
import { Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit, isLoading, setIsLoading }) => {
  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marginRatio: 0.5,
      clipRHS: 0.0,
      clipLHS: 0.0,
      anchor: "left",
    },
  });

  const handleSubmit = async (data: FormValues) => { 
    console.log("Button clicked");
    console.log("SettingsForm data:", data);
    setIsLoading(true);
    try {
      await onSubmit(data);
      confetti({
        particleCount: 90,
        spread: 220,
      });
    } catch (error) {
      console.error("SettingsForm error2:", error);
    } finally {
      setIsLoading(false);
    }
    
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, inputName: string) => {
    if (e.target.value === "") { 
      form.setValue(inputName, ""); 
    }
    else {
      form.setValue(inputName, parseFloat(e.target.value))
    }
  }

  return (
    // <Card className="p-6 max-w-lg mx-auto shadow-lg bg-white">
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
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
                    onChange={(e) => handleNumberChange(e, "marginRatio")}
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
                    onChange={(e) => handleNumberChange(e, "clipRHS")}
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
                    onChange={(e) => handleNumberChange(e, "clipLHS")}
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin"/> Processing...
              </>
            ) : (
              "Upload & Process"
            )}
            
          </Button>
        </form>
      </Form>
    {/* </Card> */}
    </div>
  );
};

export default SettingsForm;

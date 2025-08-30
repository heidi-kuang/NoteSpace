import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { FormValues } from "@/types/form";
import SettingsToolTip from "./ui/SettingsToolTip";
import { useEffect, useRef } from "react";
import { CONTENT_ALIGNMENT } from "@/constants/pdf-options";
import type { PDFOptions } from "@/types/pdf-options";
import { PDFOptionsSchema } from "@/types/pdf-options";

interface PDFSettingsPanelProps {
  onSettingsChange: (settings: PDFOptions) => void;
  isLoading: boolean; // unused
  originalPdf: File | null;
}

const isSameFile = (a: File | null, b: File | null) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
}

const PDFSettingsPanel: React.FC<PDFSettingsPanelProps> = ({ onSettingsChange, originalPdf }) => {
  const form = useForm<PDFOptions>({
    resolver: zodResolver(PDFOptionsSchema),
    mode: "onChange",
    defaultValues: {
      marginRatio: 0.0,
      clipRHS: 0.0,
      clipLHS: 0.0,
      anchor: CONTENT_ALIGNMENT.LEFT,
    },
  });

  const watchAllFields = form.watch();

  // Process file if file has changed or settings changed
  const prevSettingsRef = useRef<PDFOptions | null>(null);
  const prevOriginalPdfRef = useRef<File | null>(null);

  useEffect(() => {
    const settingsChangeDebounceTimeout = setTimeout(() => {
      const areSettingsChanged = JSON.stringify(prevSettingsRef.current) !== JSON.stringify(watchAllFields);
      const isFileChanged = !isSameFile(prevOriginalPdfRef.current, originalPdf);

      if (form.formState.isDirty && form.formState.isValid && (areSettingsChanged || isFileChanged)) {
        prevSettingsRef.current = watchAllFields;
        prevOriginalPdfRef.current = originalPdf;
        console.log("Processing:", watchAllFields);
        onSettingsChange(watchAllFields);
      } 
    }, 300);
    return () => clearTimeout(settingsChangeDebounceTimeout);
  }, [watchAllFields, form.formState.isValid, form.formState.isDirty, onSettingsChange, originalPdf]);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof PDFOptions
  ) => {
    const raw = e.target.value;
    const parsed = raw === "" ? "" : parseFloat(raw);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue(name, parsed as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>
      <Form {...form}>
        {/* Margin Ratio */}
        <FormField
          control={form.control}
          name="marginRatio"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <div className="flex flex-row gap-2 items-center mt-2">
                  <SettingsToolTip tip="How wide of a margin to add, as a % of original width." />
                  <FormLabel className="flex-1 text-right">Margin Ratio</FormLabel>
                </div>
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
              </FormItem>
              <FormMessage />
            </div>
            
          )}
        />

        {/* Anchor */}
        <FormField
          control={form.control}
          name="anchor"
          render={({ field }) => (
            <FormItem className="grid grid-cols-2 items-center gap-4">
              <div className="flex flex-row gap-2 items-center mt-2">
                <SettingsToolTip tip="Where to place your original PDF within the new one." />
                <FormLabel className="flex-1 text-right">Anchor</FormLabel>
              </div>
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

        {/* Clip RHS */}
        {/* <FormField
          control={form.control}
          name="clipRHS"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <div className="flex flex-row gap-2 items-center mt-2">
                  <SettingsToolTip tip="Clip this % from the right-hand side of the original document." />
                  <FormLabel className="flex-1 text-right">Clip RHS</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1.0"
                    value={field.value}
                    onChange={(e) => handleNumberChange(e, "clipRHS")}
                  />
                </FormControl>
              </FormItem>
              <FormMessage />
            </div>
          )}
        /> */}

        {/* Clip LHS */}
        {/* <FormField
          control={form.control}
          name="clipLHS"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormItem className="grid grid-cols-2 items-center gap-4">
                <div className="flex flex-row gap-2 items-center mt-2">
                  <SettingsToolTip tip="Clip this % from the left-hand side of the original document." />
                  <FormLabel className="flex-1 text-right">Clip LHS</FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1.0"
                    value={field.value}
                    onChange={(e) => handleNumberChange(e, "clipLHS")}
                  />
                </FormControl>
              </FormItem>
              <FormMessage />
            </div>
          )}
        /> */}

      </Form>
    </div>
  );
};

export default PDFSettingsPanel;

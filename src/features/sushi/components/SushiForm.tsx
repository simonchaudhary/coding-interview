import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MESSAGES } from "@/constants/messages";

import { type SushiFormValues, sushiSchema } from "@/schemas/sushiSchema";

import { useCreateSushi } from "../hooks/useSushiMutation";
import { useSheet } from "@/stores/useSheet";
import { FORM_DEFAULTS, FORM_PLACEHOLDERS, SUSHI_TYPES } from "../constants";

export function SushiForm() {
  const form = useForm<SushiFormValues>({
    resolver: zodResolver(sushiSchema),
    defaultValues: {
      name: FORM_DEFAULTS.NAME,
      image: FORM_DEFAULTS.IMAGE,
      price: FORM_DEFAULTS.PRICE,
      type: FORM_DEFAULTS.TYPE,
      fishType: FORM_DEFAULTS.FISH_TYPE,
      pieces: FORM_DEFAULTS.PIECES,
      fish: FORM_DEFAULTS.FISH,
    },
  });

  const { onClose } = useSheet();

  const createSushiMutate = useCreateSushi({
    onSuccess: () => {
      form.reset();
      onClose();
    },
  });

  const sushiType = form.watch("type");
  const isSubmitting = createSushiMutate.isPending;

  const onSubmit: SubmitHandler<SushiFormValues> = (data) => {
    const payload = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    createSushiMutate.mutate(payload);
  };

  return (
    <form
      id="sushi-form"
      className="flex flex-col overflow-y-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="px-4 gap-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-name">Name</FieldLabel>
              <Input
                {...field}
                id="sushi-name"
                aria-invalid={fieldState.invalid}
                placeholder={FORM_PLACEHOLDERS.NAME}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-image">Image URL</FieldLabel>
              <Input
                {...field}
                id="sushi-image"
                type="url"
                aria-invalid={fieldState.invalid}
                placeholder={FORM_PLACEHOLDERS.IMAGE_URL}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-type">Type</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="sushi-type"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select sushi type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SUSHI_TYPES.NIGIRI}>
                    {SUSHI_TYPES.NIGIRI}
                  </SelectItem>
                  <SelectItem value={SUSHI_TYPES.ROLL}>
                    {SUSHI_TYPES.ROLL}
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="fish"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-fish">Fish</FieldLabel>
              <Input
                {...field}
                id="sushi-fish"
                aria-invalid={fieldState.invalid}
                placeholder={FORM_PLACEHOLDERS.FISH}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="fishType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-fish-type">
                Fish Type{" "}
                {sushiType === SUSHI_TYPES.NIGIRI && (
                  <span className="text-red-500">*</span>
                )}
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="sushi-fish-type"
                aria-invalid={fieldState.invalid}
                placeholder={FORM_PLACEHOLDERS.FISH_TYPE}
                autoComplete="off"
              />
              <FieldDescription>
                {sushiType === SUSHI_TYPES.NIGIRI
                  ? "Required for Nigiri - specify the fish preparation type."
                  : "Optional for Roll - specify if applicable."}
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="pieces"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-pieces">
                Pieces{" "}
                {sushiType === SUSHI_TYPES.ROLL ? (
                  <span className="text-red-500">*</span>
                ) : (
                  "(Optional)"
                )}
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="sushi-pieces"
                type="number"
                inputMode="numeric"
                aria-invalid={fieldState.invalid}
                placeholder={
                  sushiType === SUSHI_TYPES.ROLL
                    ? FORM_PLACEHOLDERS.PIECES_ROLL
                    : FORM_PLACEHOLDERS.PIECES_NIGIRI
                }
                autoComplete="off"
                onChange={(e) => {
                  const val = e.target.value;
                  if (sushiType === SUSHI_TYPES.ROLL) {
                    field.onChange(val === "" ? undefined : Number(val));
                  } else {
                    field.onChange(val === "" ? null : Number(val));
                  }
                }}
              />
              <FieldDescription>
                {sushiType === SUSHI_TYPES.ROLL
                  ? "Required for Roll - number of pieces in the roll."
                  : "Optional for Nigiri - leave empty if not applicable."}
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sushi-price">Price</FieldLabel>
              <Input
                {...field}
                id="sushi-price"
                type="text"
                inputMode="decimal"
                aria-invalid={fieldState.invalid}
                placeholder={FORM_PLACEHOLDERS.PRICE}
                autoComplete="off"
              />
              <FieldDescription>
                Enter a numeric amount with up to two decimal places, like
                19.99.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup className="px-4 gap-y-4 my-6">
        <Field orientation="horizontal" className="justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            {MESSAGES.buttons.Reset}
          </Button>

          <Button type="submit" form="sushi-form" disabled={isSubmitting}>
            {isSubmitting ? MESSAGES.buttons.loading : MESSAGES.buttons.submit}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

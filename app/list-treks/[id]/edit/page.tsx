"use client";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { MapPinIcon } from "lucide-react";
import { SelectGroup } from "@radix-ui/react-select";
import { useMemo } from "react";
import dynamic from "next/dynamic";

import { format } from "date-fns";
import { CalendarIcon } from "@phosphor-icons/react";
import MapLoading from "./../../../_components/Loading-Components/MapLoading";
import { trekSchema, trekSchemaType } from "@/app/_schema/TrekSchema";
import { createClient } from "@/app/_lib/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Textarea } from "@/app/_components/ui/textarea";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const region = [
  { label: "Annapurna", value: "annapurna" },
  { label: "Langtang", value: "langtang" },
  { label: "Mustang", value: "mustang" },
  { label: "Kathmandu", value: "kathmandu" },
  { label: "Manang", value: "manang" },
];

const difficulties = [
  { label: "Easy" },
  { label: "Moderate" },
  { label: "Hard" },
];

export default function EditTrek() {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../../_components/Map"), {
        loading: () => <MapLoading />,
        ssr: false,
      }),
    [],
  );

  const form = useForm<trekSchemaType>({
    resolver: zodResolver(trekSchema),
    defaultValues: {
      trek_destination: "",
      region: "",
      latitude: undefined,
      longitude: undefined,
      date: undefined,
      distance: undefined,
      time_taken: undefined,
      difficulty: "Moderate",
      description: "",
      time_unit: "Days",
    },
  });

  const latitude = form.watch("latitude");
  const longitude = form.watch("longitude");

  const { id } = useParams();
  const trekId = Number(id);

  useEffect(() => {
    let mounted = true;
    if (!id) return;

    const fetchTrek = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("treks")
          .select("*")
          .eq("id", trekId)
          .single();

        if (error) throw error;

        if (!mounted || !data) return;

        form.reset({
          trek_destination: data.trek_destination,
          region: data.region,
          latitude: data.latitude,
          longitude: data.longitude,
          date: data.date ? new Date(data.date) : undefined,
          distance: data.distance,
          time_taken: data.time_taken,
          time_unit: data.time_unit,
          difficulty: data.difficulty,
          description: data.description,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrek();

    return () => {
      mounted = false;
    };
  }, [id, trekId]);

  async function onSubmit(data: trekSchemaType) {
    try {
      const res = await fetch(`/api/treks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        console.error(result.error);
        alert("Failed to update trek");
        return;
      }

      alert("Trek updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save trek. Check console.");
    }
  }

  return (
    <div className="container flex justify-center mt-10">
      <Card className="w-full sm:max-w-3xl">
        <CardHeader>
          <CardTitle>Edit Trek</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("FORM ERRORS", errors);
            })}
            id="add-trek"
          >
            {/* Trek name */}
            <FieldGroup className="grid grid-cols-2">
              <Controller
                name="trek_destination"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="trek_destination">
                      Trek Name
                    </FieldLabel>

                    <Input
                      {...field}
                      id="trek_destination"
                      aria-invalid={fieldState.invalid}
                      placeholder="E.g. Annapurna Base Camp"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState?.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Region */}
              <Controller
                name="region"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="region">Region </FieldLabel>

                    <div className="flex gap-2 w-full items-center border shadow-xs border-input rounded-md px-3 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
                      <label htmlFor="region" className="text-stone-400 ">
                        <MapPinIcon size={16} />
                      </label>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="region"
                          aria-invalid={fieldState.invalid}
                          className="min-w-30 border-none shadow-none w-full focus-visible:ring-0"
                        >
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectGroup>
                            <SelectLabel>Select Region</SelectLabel>
                            <SelectSeparator />
                            {region.map((region) => (
                              <SelectItem
                                key={region.value}
                                value={region.value}
                              >
                                {region.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* map */}
            <FieldGroup className="z-10">
              <Field>
                <FieldLabel>
                  Location (Find and click the location to add it)
                </FieldLabel>
                <div className="rounded-xl overflow-hidden">
                  <Map
                    position={
                      form.watch("latitude") && form.watch("longitude")
                        ? {
                            lat: form.watch("latitude"),
                            lng: form.watch("longitude"),
                          }
                        : null
                    }
                    setPosition={(pos) => {
                      form.setValue("latitude", pos.lat, {
                        shouldValidate: true,
                      });
                      form.setValue("longitude", pos.lng, {
                        shouldValidate: true,
                      });
                    }}
                    mode="create"
                  />
                </div>
                {latitude && longitude && (
                  <div className="flex gap-2">
                    <span className="text-sm text-stone-500">
                      latitude: {latitude?.toFixed(2)},
                    </span>
                    <span className="text-sm text-stone-500">
                      longitude: {longitude?.toFixed(2)}
                    </span>
                  </div>
                )}
                {form.formState.errors.latitude && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.latitude.message}
                  </span>
                )}
                {form.formState.errors.longitude && (
                  <span className="text-red-500 text-sm">
                    {form.formState.errors.longitude.message}
                  </span>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-3 items-center">
              <Controller
                name="distance"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="distance">Distance</FieldLabel>

                    <Input
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        field.onChange(v === "" ? undefined : Number(v));
                      }}
                      id="distance"
                      aria-invalid={fieldState.invalid}
                      placeholder="0.0"
                      autoComplete="off"
                      type="number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState?.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="time_taken"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="time_taken">Duration</FieldLabel>

                    <Input
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      id="time_taken"
                      aria-invalid={fieldState.invalid}
                      placeholder="0.0"
                      autoComplete="off"
                      type="number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState?.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="time_unit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="region"
                      className="opacity-0 pointer-events-none"
                    >
                      {" "}
                      days or hours
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="time_unit"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30 "
                      >
                        <SelectValue placeholder="Days or Hours" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectGroup>
                          <SelectLabel>Days or Hours</SelectLabel>
                          <SelectSeparator />

                          <SelectItem value="Days">Days</SelectItem>
                          <SelectItem value="Hours">Hours</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2">
              <Controller
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="trek-date">Trek Date</Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="trek-date"
                          variant="outline"
                          className="justify-start text-left"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.error && (
                      <span className="text-sm text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="difficulty"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet>
                    <FieldLabel>Difficulty</FieldLabel>

                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 "
                    >
                      {difficulties.map((difficulty) => (
                        <FieldLabel
                          key={difficulty.label}
                          htmlFor={`radiogroup-${difficulty.label}`}
                          className="h-8 -mt-1"
                        >
                          <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                            className="h-1"
                          >
                            <FieldContent className="flex items-center justify-center h-0">
                              <FieldTitle className="h-0">
                                {difficulty.label}
                              </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem
                              value={difficulty.label}
                              id={`radiogroup-${difficulty.label}`}
                              aria-invalid={fieldState.invalid}
                              className="hidden border "
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">
                      Notes and Memories
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="How was the trail? What did you see?"
                      className="min-h-30"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="add-trek">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

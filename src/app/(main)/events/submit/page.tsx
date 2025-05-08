"use client";

import { useState } from "react";
import { Calendar, MapPin, Globe, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Category {
  id: string;
  name: string;
}

interface FormState {
  title: string;
  description: string;
  startDate: Date | null;
  startTime: string;
  location: string;
  isOnline: boolean;
  onlineUrl: string;
  selectedCategories: string[];
  agreedToTerms: boolean;
  formStep: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  startDate?: string;
  startTime?: string;
  location?: string;
  onlineUrl?: string;
  categories?: string;
  terms?: string;
  submit?: string;
}

const EventSubmissionPage = () => {
  // Simplified data
  const categories: Category[] = [
    { id: "1", name: "Conference" },
    { id: "2", name: "Workshop" },
    { id: "3", name: "Seminar" },
    { id: "4", name: "Hackathon" },
    { id: "5", name: "Career Fair" },
    { id: "6", name: "Social" },
  ];

  // Form state
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    startDate: null,
    startTime: "",
    location: "",
    isOnline: false,
    onlineUrl: "",
    selectedCategories: [],
    agreedToTerms: false,
    formStep: 1,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formState.title.trim()) errors.title = "Title is required";
    if (!formState.description.trim())
      errors.description = "Description is required";
    if (!formState.startDate) errors.startDate = "Start date is required";
    if (!formState.startTime) errors.startTime = "Start time is required";
    if (formState.isOnline && !formState.onlineUrl.trim())
      errors.onlineUrl = "Online URL is required";
    if (!formState.isOnline && !formState.location.trim())
      errors.location = "Location is required";
    if (formState.selectedCategories.length === 0)
      errors.categories = "At least one category is required";
    if (!formState.agreedToTerms) errors.terms = "You must agree to the terms";
    return errors;
  };

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedCategories: prevState.selectedCategories.includes(categoryId)
        ? prevState.selectedCategories.filter((id) => id !== categoryId)
        : [...prevState.selectedCategories, categoryId],
    }));
    if (formErrors.categories) {
      setFormErrors({ ...formErrors, categories: undefined });
    }
  };

  const handleNextStep = () => {
    // Only validate fields relevant to step 1
    const step1Errors: FormErrors = {};
    if (!formState.title.trim()) step1Errors.title = "Title is required";
    if (!formState.description.trim())
      step1Errors.description = "Description is required";
    if (!formState.startDate) step1Errors.startDate = "Start date is required";
    if (!formState.startTime) step1Errors.startTime = "Start time is required";
    if (formState.isOnline && !formState.onlineUrl.trim())
      step1Errors.onlineUrl = "Online URL is required";
    if (!formState.isOnline && !formState.location.trim())
      step1Errors.location = "Location is required";

    if (Object.keys(step1Errors).length === 0) {
      setFormState({ ...formState, formStep: 2 });
      window.scrollTo(0, 0);
    } else {
      setFormErrors(step1Errors);
    }
  };

  const handlePrevStep = () => {
    setFormState({ ...formState, formStep: 1 });
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Submitting event:", formState);
        setFormSubmitted(true);
      } catch (error) {
        setFormErrors({ submit: "There was an error submitting your event." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Success screen
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-purple-200 shadow-md">
            <CardHeader className="bg-purple-50">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-center text-xl">
                Event Submitted Successfully!
              </CardTitle>
              <CardDescription className="text-center">
                Thank you for submitting your event. Your submission is under
                review.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">{formState.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>
                    {formState.startDate
                      ? format(formState.startDate, "MMMM d, yyyy")
                      : ""}
                    {formState.startTime ? ` at ${formState.startTime}` : ""}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {formState.description.substring(0, 100)}...
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 p-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormState({
                    title: "",
                    description: "",
                    startDate: null,
                    startTime: "",
                    location: "",
                    isOnline: false,
                    onlineUrl: "",
                    selectedCategories: [],
                    agreedToTerms: false,
                    formStep: 1,
                  });
                }}
              >
                Submit Another Event
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-500 text-white py-4">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-2xl font-bold">Submit Your Event</h1>
          <p className="mt-1">Share your event with the community</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center mb-2">
              <CardTitle>Event Information</CardTitle>
              <div className="text-sm font-medium text-gray-500">
                Step {formState.formStep} of 2
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-purple-500 h-1.5 rounded-full transition-all"
                style={{ width: formState.formStep === 1 ? "50%" : "100%" }}
              ></div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            {/* Step 1 - Basic Info */}
            {formState.formStep === 1 && (
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    Event Title <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className={formErrors.title ? "border-red-300" : ""}
                    placeholder="Give your event a clear title"
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500">{formErrors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Event Description{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    className={`min-h-32 ${
                      formErrors.description ? "border-red-300" : ""
                    }`}
                    placeholder="Provide details about your event"
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-500">
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                    Date & Time
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        Start Date <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              formState.startDate ? "" : "text-gray-400"
                            } ${formErrors.startDate ? "border-red-300" : ""}`}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {formState.startDate
                              ? format(formState.startDate, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={formState.startDate || undefined}
                            onSelect={(date) => {
                              setFormState({
                                ...formState,
                                startDate: date || null,
                              });
                              if (formErrors.startDate) {
                                setFormErrors({
                                  ...formErrors,
                                  startDate: undefined,
                                });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {formErrors.startDate && (
                        <p className="text-sm text-red-500">
                          {formErrors.startDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime" className="flex items-center">
                        Start Time <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formState.startTime}
                        onChange={handleInputChange}
                        className={formErrors.startTime ? "border-red-300" : ""}
                      />
                      {formErrors.startTime && (
                        <p className="text-sm text-red-500">
                          {formErrors.startTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                    Location
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isOnline"
                        checked={formState.isOnline}
                        onCheckedChange={(checked) => {
                          setFormState({ ...formState, isOnline: checked });
                          if (formErrors.location || formErrors.onlineUrl) {
                            setFormErrors({
                              ...formErrors,
                              location: undefined,
                              onlineUrl: undefined,
                            });
                          }
                        }}
                      />
                      <Label htmlFor="isOnline">This is an online event</Label>
                    </div>

                    {formState.isOnline ? (
                      <div className="space-y-2">
                        <Label
                          htmlFor="onlineUrl"
                          className="flex items-center"
                        >
                          Meeting URL{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="flex items-center relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="onlineUrl"
                            name="onlineUrl"
                            value={formState.onlineUrl}
                            onChange={handleInputChange}
                            className={`pl-10 ${
                              formErrors.onlineUrl ? "border-red-300" : ""
                            }`}
                            placeholder="https://zoom.us/j/123456789"
                          />
                        </div>
                        {formErrors.onlineUrl && (
                          <p className="text-sm text-red-500">
                            {formErrors.onlineUrl}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center">
                          Physical Location{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formState.location}
                          onChange={handleInputChange}
                          className={
                            formErrors.location ? "border-red-300" : ""
                          }
                          placeholder="University Hall Room 101, 123 Campus Drive"
                        />
                        {formErrors.location && (
                          <p className="text-sm text-red-500">
                            {formErrors.location}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <CardFooter className="flex justify-end p-0 pt-4">
                  <Button
                    type="button"
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={handleNextStep}
                  >
                    Continue to Next Step
                  </Button>
                </CardFooter>
              </CardContent>
            )}

            {/* Step 2 - Categories & Terms */}
            {formState.formStep === 2 && (
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      Categories <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Select at least one category that best describes your
                      event
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
  {categories.map((category) => (
    <div
      key={category.id}
      className={`p-2 border rounded-md transition-colors ${
        formState.selectedCategories.includes(category.id)
          ? "bg-purple-50 border-purple-200"
          : "hover:border-purple-200"
      }`}
    >
      <label className="flex items-center cursor-pointer space-x-2">
        <Checkbox
          checked={formState.selectedCategories.includes(category.id)}
          onCheckedChange={() => handleCategoryToggle(category.id)}
        />
        <span>{category.name}</span>
      </label>
    </div>
  ))}
</div>
                    {formErrors.categories && (
                      <p className="text-sm text-red-500">
                        {formErrors.categories}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      name="agreedToTerms"
                      checked={formState.agreedToTerms}
                      onCheckedChange={(checked) =>
                        setFormState({
                          ...formState,
                          agreedToTerms: Boolean(checked),
                        })
                      }
                      className={formErrors.terms ? "border-red-300" : ""}
                    />
                    <Label htmlFor="terms" className="text-sm leading-tight">
                      I agree to the{" "}
                      <a href="/terms" className="text-purple-600 underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-purple-600 underline">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  {formErrors.terms && (
                    <p className="text-sm text-red-500 mt-1">
                      {formErrors.terms}
                    </p>
                  )}
                </div>

                <CardFooter className="flex justify-between p-0 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Event"}
                  </Button>
                </CardFooter>
              </CardContent>
            )}
          </form>
        </Card>

        {/* Preview card */}
        {formState.title && (
          <Card className="mt-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">{formState.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>
                    {formState.startDate
                      ? format(formState.startDate, "MMMM d, yyyy")
                      : "Date TBD"}
                    {formState.startTime ? ` at ${formState.startTime}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 text-purple-500" />
                  <span>
                    {formState.isOnline
                      ? "Online Event"
                      : formState.location || "Location TBD"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {formState.description || "Description will appear here."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventSubmissionPage;

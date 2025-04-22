import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Integral } from "../../calculetes/src/integral";

type PredefinedFunction = {
  name: string;
  fn: (x: number) => number;
  expression: string;
};

const PREDEFINED_FUNCTIONS: PredefinedFunction[] = [
  { name: "x²", fn: (x) => x * x, expression: "x²" },
  { name: "x³", fn: (x) => x * x * x, expression: "x³" },
  { name: "sin(x)", fn: Math.sin, expression: "sin(x)" },
  { name: "cos(x)", fn: Math.cos, expression: "cos(x)" },
  { name: "e^x", fn: Math.exp, expression: "e^x" },
  { name: "1/x", fn: (x) => 1 / x, expression: "1/x" },
  { name: "ln(x)", fn: Math.log, expression: "ln(x)" },
  { name: "√x", fn: Math.sqrt, expression: "√x" },
];

export const IntegralCalculator: React.FC = () => {
  const [from, setFrom] = useState<string>("0");
  const [to, setTo] = useState<string>("1");
  const [partitions, setPartitions] = useState<string>("10000");
  const [selectedFunction, setSelectedFunction] = useState<string>(
    PREDEFINED_FUNCTIONS[0].name
  );
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateIntegral = useCallback(() => {
    try {
      setError(null);

      const fromValue = parseFloat(from);
      const toValue = parseFloat(to);
      const partitionsValue = parseInt(partitions, 10);

      if (isNaN(fromValue) || isNaN(toValue) || isNaN(partitionsValue)) {
        throw new Error("Please enter valid numbers for all fields");
      }

      if (partitionsValue <= 0) {
        throw new Error("Partitions must be a positive number");
      }

      const functionToUse = PREDEFINED_FUNCTIONS.find(
        (f) => f.name === selectedFunction
      );

      if (!functionToUse) {
        throw new Error("Please select a valid function");
      }

      const integral = new Integral({ partitions: partitionsValue });
      const calculatedResult = integral.calculate(functionToUse.fn, {
        from: fromValue,
        to: toValue,
      });

      setResult(calculatedResult);
    } catch (err: any) {
      setError(err.message || "An error occurred during calculation");
    }
  }, [from, to, partitions, selectedFunction]);

  const getSelectedFunctionExpression = () => {
    return (
      PREDEFINED_FUNCTIONS.find((f) => f.name === selectedFunction)
        ?.expression || ""
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Definite Integral Calculator</CardTitle>
        <CardDescription>
          Calculate integrals using Riemann sums
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="function">Function</Label>
          <Select value={selectedFunction} onValueChange={setSelectedFunction}>
            <SelectTrigger id="function">
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Common Functions</SelectLabel>
                {PREDEFINED_FUNCTIONS.map((func) => (
                  <SelectItem key={func.name} value={func.name}>
                    {func.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">Lower Bound</Label>
            <Input
              id="from"
              type="number"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Lower bound"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">Upper Bound</Label>
            <Input
              id="to"
              type="number"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Upper bound"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="partitions">Partitions</Label>
          <Input
            id="partitions"
            type="number"
            value={partitions}
            onChange={(e) => setPartitions(e.target.value)}
            placeholder="Number of partitions"
          />
          <p className="text-xs text-muted-foreground">
            Higher values give more precise results but may be slower
          </p>
        </div>

        <div className="pt-4">
          <Button onClick={calculateIntegral} className="w-full">
            Calculate
          </Button>
        </div>
      </CardContent>

      {result !== null && (
        <CardFooter className="flex flex-col items-start">
          <div className="w-full p-4 bg-muted rounded-md">
            <p className="text-sm font-medium">
              ∫<sub>{from}</sub>
              <sup>{to}</sup> {getSelectedFunctionExpression()} dx
            </p>
            <p className="text-2xl font-semibold mt-2">{result.toFixed(6)}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

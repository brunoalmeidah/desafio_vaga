"use client";
import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Controller, useForm } from "react-hook-form";
import { ChangeEventHandler } from "react";
import { Input } from "@/components/ui/input";
export interface IFilterData {
  date: DateRange | undefined;
  customer: string
}

interface IProps {
  onFilter: (data: IFilterData | null) => void;
  handleFileChange: ChangeEventHandler<HTMLInputElement> | undefined
}
export function DashboardTableFilters({ onFilter, handleFileChange }: IProps) {
  const { handleSubmit, reset, control, register } = useForm<IFilterData>();

  function handleRemoveFilter() {
    onFilter(null);
    reset({ date: undefined });
  }

  function handleUploadClick() {
    document.getElementById('fileInput')?.click()
  }

  return (
    <div className="flex items-center justify-between">
      <form
        className="flex items-center gap-2"
        onSubmit={handleSubmit(onFilter)}
      >
        <span className="text-sm font-semibold">Filtros: </span>
        <Input
          placeholder="Digite o nome do cliente"
          className="w-[328px]"
          {...register('customer')}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value, onBlur, ref } }) => (
            <DateRangePicker
              date={value}
              onSelect={(dateRage: DateRange | undefined) => {
                onChange(dateRage);
              }}
            />
          )}
        />

        <Button type="submit" variant="secondary" size="sm" className="h-8">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleRemoveFilter}
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Button type="button" size="lg" className="h-8" onClick={handleUploadClick}>
        Importar Arquivo
      </Button>
      <input
        type="file"
        className="hidden"
        id="fileInput"
        accept="text/plain"
        onChange={handleFileChange}
      />
    </div>
  );
}

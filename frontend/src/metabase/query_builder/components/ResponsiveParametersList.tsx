import React, { useCallback, useState, useMemo } from "react";
import useIsSmallScreen from "metabase/hooks/use-is-small-screen";
import Button from "metabase/core/components/Button";

import { Parameter } from "metabase-types/types/Parameter";

import {
  FilterButton,
  ParametersListHeader,
  StyledParametersList,
  ResponsiveParametersListRoot,
  ParametersListContainer,
} from "./ResponsiveParametersList.styled";

interface ResponsiveParametersListProps {
  parameters: Parameter[];
  setParameterValue: (parameterId: string, value: string) => void;
  setParameterIndex: (parameterId: string, parameterIndex: number) => void;
}

export const ResponsiveParametersList = ({
  parameters,
  setParameterValue,
  setParameterIndex,
}: ResponsiveParametersListProps) => {
  const [mobileShowParameterList, setShowMobileParameterList] = useState(false);
  const isSmallScreen = useIsSmallScreen();

  const handleFilterButtonClick = useCallback(() => {
    setShowMobileParameterList(!mobileShowParameterList);
  }, [mobileShowParameterList]);

  const activeFilters = useMemo(() => {
    return parameters.filter(p => !!p.value).length;
  }, [parameters]);

  return (
    <ResponsiveParametersListRoot>
      {isSmallScreen && (
        <FilterButton
          borderless
          primary
          icon="filter"
          onClick={handleFilterButtonClick}
        >
          {activeFilters > 0 ? `${activeFilters} active filters` : `Filters`}
        </FilterButton>
      )}
      <ParametersListContainer
        isSmallScreen={isSmallScreen}
        mobileShow={mobileShowParameterList}
      >
        {isSmallScreen && (
          <ParametersListHeader>
            <h3>Filters</h3>
            <Button
              onlyIcon
              borderless
              icon="close"
              onClick={handleFilterButtonClick}
              iconSize={14}
            />
          </ParametersListHeader>
        )}
        <StyledParametersList
          parameters={parameters}
          setParameterValue={setParameterValue}
          setParameterIndex={setParameterIndex}
          isEditing
          commitImmediately
        />
      </ParametersListContainer>
    </ResponsiveParametersListRoot>
  );
};

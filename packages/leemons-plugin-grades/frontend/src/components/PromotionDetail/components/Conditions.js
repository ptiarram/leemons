import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@bubbles-ui/components';
import { RuleGroup } from '@bubbles-ui/leemons';

const Conditions = ({ messages, errorMessages, selectData, form }) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = form;

  const [edited, setEdited] = useState([]);
  const [error, setError] = useState(false);

  const program = watch('program');

  register('group', {
    validate: () => {
      const err = edited.filter((item) => item.value === false).length !== 0;
      setError(err);
      return !err;
    },
  });
  const group = watch('group');

  function onChange(e) {
    setValue('group', e);
  }

  console.log(selectData);

  return (
    <Box>
      <RuleGroup
        program={{ value: program }}
        grades={selectData.gradeScales}
        gradeSystem={program?.gradeSystem} // Antes se pasaba grade pero como ya no hay que seleccionarlo le paso programa para que la logica interna siga funcionando igual
        sources={selectData.sources}
        courses={selectData.courses}
        knowledges={selectData.knowledges}
        subjects={selectData.subjects}
        subjectTypes={selectData.subjectTypes}
        subjectGroups={selectData.groups}
        dataTypes={selectData.dataTypes}
        operators={selectData.operators}
        group={group}
        data={group}
        setData={onChange}
        edited={edited}
        setEdited={setEdited}
        error={error}
        setError={setError}
        errorMessage={errorMessages.conditionErrorMessage}
        labels={messages.conditions.labels}
        placeholders={messages.conditions.placeholders}
      />
    </Box>
  );
};

Conditions.propTypes = {
  messages: PropTypes.object.isRequired,
  errorMessages: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  selectData: PropTypes.object.isRequired,
};

export { Conditions };

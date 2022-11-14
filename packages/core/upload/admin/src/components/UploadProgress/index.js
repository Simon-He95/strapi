import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cross from '@strapi/icons/Cross';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { ProgressBar } from '@strapi/design-system/ProgressBar';
import { useIntl } from 'react-intl';

const BoxWrapper = styled(Flex)`
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  width: 100%;
  height: 100%;

  svg {
    path {
      fill: ${({ theme, error }) => (error ? theme.colors.danger600 : undefined)};
    }
  }
`;

const CancelButton = styled.button`
  border: none;
  background: none;
  width: min-content;

  svg {
    height: ${({ theme }) => theme.spaces[2]};
    width: ${({ theme }) => theme.spaces[2]};

    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;

export const UploadProgress = ({ onCancel, progress, error }) => {
  const { formatMessage } = useIntl();

  return (
    <BoxWrapper alignItems="center" background={error ? 'danger100' : 'neutral150'} error={error}>
      {error ? (
        <Cross aria-label={error?.message} />
      ) : (
        <Stack alignItems="center" spacing={2} width="100%">
          <ProgressBar value={progress}>{`${progress}/100%`}</ProgressBar>

          <CancelButton type="button" onClick={onCancel}>
            <Stack horizontal spacing={1}>
              <Typography variant="pi" as="span" textColor="neutral600">
                {formatMessage({
                  id: 'app.components.Button.cancel',
                  defaultMessage: 'Cancel',
                })}
              </Typography>

              <Cross aria-hidden />
            </Stack>
          </CancelButton>
        </Stack>
      )}
    </BoxWrapper>
  );
};

UploadProgress.defaultProps = {
  error: undefined,
  progress: 0,
};

UploadProgress.propTypes = {
  error: PropTypes.instanceOf(Error),
  onCancel: PropTypes.func.isRequired,
  progress: PropTypes.number,
};

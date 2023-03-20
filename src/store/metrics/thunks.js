import { DateTime } from "luxon";
import { autenticacionPorEmailPassword } from "../../api/auth";
import { getISOFormat } from "../../helpers/getISOFormat";
import { getToken } from "../../helpers/getToken";
import { setLastSensorMetrics, setMetrics } from "./metricSlice";

export const getMetricSensors = ({
  dateTimeflFrom,
  dateTimeflTo,
  sensorId,
}) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      let from = getISOFormat(dateTimeflFrom);
      let to = getISOFormat(dateTimeflTo);
      // let sensorId = sensorId ? sensorId : 0;
      const resp = await autenticacionPorEmailPassword.get(
        "metrics",
        {
          params: { from, to, sensorId: sensorId ? sensorId : 0 },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(resp.data.metrics);
      dispatch(setMetrics(resp.data.metrics));
    } catch (error) {
      console.log("Algo salió mal :(");
      console.log(error);
    }
  };
};

export const getLastSensorMetrics = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const resp = await autenticacionPorEmailPassword.get(
        "metrics/last-values-by-sensors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setLastSensorMetrics(resp.data.metrics));
    } catch (error) {
      console.log("Algo salió mal :(");
      console.log(error);
    }
  };
};

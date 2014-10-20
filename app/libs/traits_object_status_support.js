exports.traits={
	_setStatusPending : function(){
		this._states_="pending";
		if(this._onPending)
		{
			this._onPending();
		}
	},
	_setStatusReady : function(){
		this._states_ = "ready";
		if(this._onReady)
		{
			this._onReady();
		}
	},
	_setStatusSuccess : function(data)
	{
		this._states_="success";
		this._data_ = data;
		if(this._onSuccess)
		{
			this._onSuccess(data);
		}
	},
	_setStatusFailed : function(error)
	{
		this._states_="failed";
		this._error_=error;
		if(this._onFailed)
		{
			this._onFailed(error);
		}
	},
	success : function(fn)
	{
		this._onSuccess=fn;
		if(this._states_ === "success")
		{
			this._onSuccess(this._data_);
		}
		return this;
	},
	failed : function(fn)
	{
		this._onFailed=fn;
		if(this._states_ === "failed")
		{
			this._onFailed(this._error_);
		}
		return this;
	},
	pending: function(fn)
	{
		this._onPending=fn;
		if(this._states_ === "pending")
		{
			this._onPending();
		}
		return this;
	},
	ready: function(fn)
	{
		this._onReady=fn;
		if(this._states_ ==="ready")
		{
			this._onReady();
		}
		return this;
	}
}
